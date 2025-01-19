import { tagCreate,tagRead } from "../Infrastructure/tag.js"
import { postTagCreate,postTagRead } from "../Infrastructure/postTag.js"

export async function extractPostTags(content, postID) {

    const tags = content.match(/#\w+/g);

    tags.forEach(async tag => {
        const tagObjs = await tagRead({tag:tag});
        let tagObj = tagObjs[0];

        if (!tagObj) {
            tagObj = await tagCreate({tag:tag})
        }

        await postTagCreate({tagID:tagObj.id, postID:postID});
    });
}