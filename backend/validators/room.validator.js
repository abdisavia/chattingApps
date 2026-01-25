import Joi from "joi";

export const roomSchema = Joi.object({
    type: Joi.string().valid('group', 'personal').required().messages({
        'any.only': 'Tipe room hanya bisa diisi dengan group atau personal.',
        'any.required': 'Tipe room wajib diisi.',
        'string.base':'Tipe room harus string.'
    }),
    room_name: Joi.string().pattern(/^[A-Za-z0-9 ]+$/).optional().messages({
        'string.pattern.base':"Nama room hanya boleh mengandung huruf besar/kecil/angka/spasi."
    }),
    created_by: Joi.number().required().messages({
        "any.required":"Id pembuat harus diisi.",
        "number.base":"Id user harus berupa angka."
    }),
    participants: Joi.array().items(Joi.string()).max(50).message({
        "array.base":"participant harus berbetuk array",
        "array.max":"room hanya dapat berisi maksimal 50 participant",
    })
})
