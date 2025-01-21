import Joi from "joi";

export default function (req) {
    const schema = Joi.object({
        name: Joi.string().max(50).required(),
        aboutUser: Joi.string().max(160).required()
    });

    return schema.validate(req);
}