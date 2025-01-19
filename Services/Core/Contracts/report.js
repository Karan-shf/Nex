import Joi from "joi";

export default function(req) {

    const validTypes =  ["Hate Speech","Harassment","Violent Speech","Child Safety","Privacy","Spam"];

    const schema = Joi.object({
        reportedID: Joi.number().min(1).required(),
        reportType: Joi.string().valid(...validTypes).required(),
        furtherExplanations: Joi.string().max(400)
    });

    return schema.validate(req);
}