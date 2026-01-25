import Joi from "joi";

export const joinSchema = Joi.object({
    userId: Joi.number().required().messages({
        "number.base": "User id harusnya berupa nomor",
        "any.required": "user id wajib diisi",
    }),
    role: Joi.string().valid("admin", "member").required().messages({
        "string.base": "Role seharusnya string",
        "any.only": "Role hanya bisa diisi oleh admin/member",
        "any.required":"Role wajib diisi"
    }),
    roomId: Joi.number().required().messages({
        "number.base": "User id harusnya berupa nomor",
        "any.required": "user id wajib diisi",
    })
})

export const userRoomId = Joi.object({
    userId: Joi.number().required().messages({
        "number.base": "User id harusnya berupa nomor",
        "any.required": "user id wajib diisi",
    }),
    roomId: Joi.number().required().messages({
        "number.base": "User id harusnya berupa nomor",
        "any.required": "user id wajib diisi",
    })
})
