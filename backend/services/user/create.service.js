import { authSchema } from "../../validators/auth.validator.js";
import { getUserService } from "./get.service.js";
import { models } from "../../model/index.js";
import bcrypt from 'bcryptjs';
import Joi from "joi";

export const createUser = async (userData) => {
    if (!userData) throw new Error("ValidationError:User data is required");
    
    const validation = authSchema.validate(userData, { abortEarly: false });
    if (validation.error) {
        throw new Error(validation.error);
    }

    userData.password = await bcrypt.hash(userData.password, 10);
    const existingUser = await getUserService.getUserByEmail(userData.email);

    if (existingUser?.dataValues) throw new Error("AlreadyExist: user with this email already exists");

    return models.users.create(userData);
}