import Joi from "joi";

export default function(req) {

    const validstatus =  ["Accepted", "Ignored"];

    const schema = Joi.object({
        reportID: Joi.number().min(1).required(),
        status: Joi.string().valid(...validstatus).required()
    });

    return schema.validate(req);
}