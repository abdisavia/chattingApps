import Joi from "joi";

export const messageSchema = Joi.object({
    roomId: Joi.number().integer().required(),
    senderId: Joi.number().integer().required(),
    content: Joi.string().allow(null, "").optional(),
    attachments: Joi.array().items(Joi.object({
        filename: Joi.string().required(),
        fileType: Joi.string().required(),
        url: Joi.string().required()
    })).optional()
})