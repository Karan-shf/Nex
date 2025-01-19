import Joi from "joi";

export default function(req) {
    const schema = Joi.object({
        followingID: Joi.number().min(1).required()
    });

    return schema.validate(req);
}