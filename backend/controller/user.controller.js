import { createUser } from "../services/user/create.service.js";
import { getUserService } from "../services/user/get.service.js";
import { createToken } from "../utils/token/createToken.js";
import response from "../utils/response.js";
import { formatError } from "../validators/ErrorFormat.js";
import { compare } from "bcryptjs";
import { loginSchema } from "../validators/auth.validator.js";

const registerUser = async (req, res) => {
    try {
        const data = req.body;

        const user = await createUser(data);

        const token = createToken(user.dataValues);

        return res.status(201).json(response(201, token, "User created successfully", null));
    } catch (e) {
        const errorFormat = formatError(e.message);
        return res.status(errorFormat.status).json(errorFormat);
    }
}

const loginUser = async (req, res) => {
    try {
        const data = req.body;
        
        const validation = loginSchema.validate(data,{abortEarly:false});
        if (validation.error) throw new Error(validation.error);
        
        const userLoggedin = await getUserService.getUserByEmail(data.email);
        if (!userLoggedin) return res.status(200).json(response(200, userLoggedin, null, "email/pasword salah"));
        
        const isPasswordValid = await compare(data.password,userLoggedin.dataValues.password)
        if (!isPasswordValid) return res.status(200).json(response(200, null, null, "email/password salah"))
        
        
        if(!userLoggedin.dataValues) return res.status(200).json(response(200,user, "email/password salah",null))
        const userToken = createToken(userLoggedin.dataValues);

        return res.status(200).json(response(200, userToken, "Login successful", null))
    } catch (e) {
        res.clearCookie('token')
        const errorFormat = formatError(e.message);
        return res.status(errorFormat.status).json(errorFormat);
    }
}

const logout = async (req, res) => {
    try {
        if (!req.cookies.token) throw new Error("User is not authenticated");
        res.clearCookie('token');
        return res.status(204).json(response(204,null,"Logout user successfull",null));
    } catch (e) {
        const errorFormat = formatError(e.message);
        return res.status(errorFormat.status).json(errorFormat);
    }
}

const getUserByEmail = async (req,res) => {
    try{
        const email = req.params.email;
        const emailSchema = loginSchema.extract("email");
        const validation = emailSchema.validate(email);

        console.log(req.user);


        if(validation.error) throw new Error(validation.error);

        const result = await getUserService.getUserByEmail(email);
        if(!result) return res.status(200).json(response(200, null, null, "user tidak ditemukan"))
        if(result.dataValues.id === req.user.id) return res.status(200).json(response(200,null, null, "Email anggota dengan user saat ini sama"))
        return res.status(200).json(response(200, {name:result.dataValues.name}, "user exist", null));
    }catch(e){
        console.log(e.message)
        const errorFormat = formatError(e.message);
        return res.status(errorFormat.status).json(errorFormat);
    }
}


export { registerUser, loginUser, logout, getUserByEmail };