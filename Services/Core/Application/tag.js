import { tagCreate, tagRead } from "../Infrastructure/tag.js"
import { postTagCreate, postTagRead } from "../Infrastructure/postTag.js"
import { Tag } from "../Domain/Models/tag.js";
import { PostTag } from "../Domain/Models/postTag.js";
import { Op, fn, col, literal } from "sequelize";

export async function extractPostTags(content, postID) {

    const tags = content.match(/#\w+/g);

    if (tags) {
        tags.forEach(async tag => {
            const tagObjs = await tagRead({tag:tag});
            let tagObj = tagObjs[0];
    
            if (!tagObj) {
                tagObj = await tagCreate({tag:tag})
            }

            tagObj.tagCount++;
            await tagObj.save();
    
            await postTagCreate({tagID:tagObj.id, postID:postID});
        });
    }

}

export async function getTopTags(req,res) {

    PostTag.belongsTo(Tag, { foreignKey: 'tagID' });  
    Tag.hasMany(PostTag, { foreignKey: 'tagID' }); 

    const endDate = Date.now();
    const startDate = new Date(endDate - (7 * 24 * 60 * 60 * 1000));

    const results = await PostTag.findAll({
        attributes: [
            'tagID', 
            [fn('count', col('PostTag.tagID')), 'count'],
        ],
        include: [{
            model: Tag,
            as: 'Tag', 
            attributes: ['tag'],  
            required: true,   
            on: {
            '$PostTag.tagID$': { [Op.eq]: col('Tag.id') }  
            }
        }],
        where: {
            createdAt: {
            [Op.between]: [startDate, endDate], 
            }
        },
        group: ['PostTag.tagID', 'Tag.tag', 'Tag.id'],  
        order: [[fn('count', col('PostTag.tagID')), 'DESC']], 
        limit: 10 
    });

    res.status(200).json(results);
}