import Joi from "joi";

export default function(req) {
    const schema = Joi.object({
        content: Joi.string().max(280).required(),
        quotedFrom: Joi.number().min(1),
        repliesTo: Joi.number().min(1)
    });

    return schema.validate(req);
}