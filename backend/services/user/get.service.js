import { models } from "../../model/index.js";
import bcrypt from "bcryptjs";
import { loginSchema } from "../../validators/auth.validator.js";

const getUserById = async (userId) => {
    if (!userId) throw new Error("User ID is required");
    return models.users.findByPk(userId);
}

const getUserByEmail = async (email) => {
    if (!email) throw new Error("Email is required");
    return models.users.findOne({
        where: { email: email }
    })
}


export const getUserService = {
    getUserById,
    getUserByEmail,
}