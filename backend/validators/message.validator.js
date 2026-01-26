import Joi from "joi";

export const messageSchema = Joi.object({
    roomId: Joi.number().integer().required().messages({
        "number.base":"roomId harus number",
        "number.integer":"roomId harus bertipe Integer",
        "any.required":"roomId wajib diisi"
    }),
    senderId: Joi.number().integer().required().messages({
        "number.base":"senderId harus number",
        "number.integer":"senderId harus bertipe Integer",
        "any.required":"senderId wajib diisi"
    }),
    type:Joi.string().valid("image","pdf","text").required().messages({
        "string.base":"type harus string",
        "any.only":"type hanya boleh berisi image / pdf / text",
        "any.required":"type wajib diisi"
    }),
    message: Joi.string().optional(),
    attachmentsId: Joi.number().optional().messages({
        "number.base":"attachmentsId harus berupa number",
    })
})