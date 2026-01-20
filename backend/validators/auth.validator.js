import Joi from "joi";

export const authSchema = Joi.object({
    email: Joi.string().email().required().messages({
        "string.base": "Email seharusnya string.",
        "string.email": "Email invalid.",
        "any.required": "Email tidak boleh kosong."
    }),
    password: Joi.string().min(6).required().messages({
        "string.base": "Password seharusnya bertipe data string.",
        "string.min": "Password harus memiliki minimal 6 huruf.",
        "any.required": "Password wajib diisi."
    }),
    name: Joi.string().required().messages({
        "string.base": "Nama seharusnya bertipe data string.",
        "any.required":"Nama wajib diisi."
    }),
    role: Joi.string().required().valid("admin","agent","customer").default("customer").messages({
        "string.base": "Role seharunya bertipe data strng.",
        "any.required": "Role wajib diisi.",
        "any.only":"Role seharunya berisi admin/agent/customer."
    })
})

export const loginSchema = Joi.object({
    email: Joi.string().email().required().messages({
        "string.base": "Email seharusnya string.",
        "string.email": "Email invalid.",
        "any.required": "Email tidak boleh kosong.",
    }),
    password: Joi.string().min(6).required().messages({
        "string.base": "Password seharusnya bertipe data string.",
        "string.min": "Password harus memiliki minimal 6 huruf.",
        "any.required": "Password wajib diisi."
    })
})