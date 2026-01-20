import { verifyToken } from "../utils/token/verifyToken.js";
import response from "../utils/response.js";

export const verifyCookie = (req, res, next) => {
    const token = req.headers.authorization;
    try {
        console.log(token);
        if (!token) throw new Error("auth:Invalid Token")
        const user = verifyToken(token);
        req.user = user;
        return next();
    } catch (e) {
        return res.status(401).json(response(401,null,null,e.message))
    }
}