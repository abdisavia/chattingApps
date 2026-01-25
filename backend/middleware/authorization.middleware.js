import { verifyToken } from "../utils/token/verifyToken.js";
import response from "../utils/response.js";

export const checkAuthorization = (req, res, next) => {
    try {
        // if (req.baseUrl === '/room') {
        //     if (!["agent", "admin"].includes(verifiedToken.role)) throw new Error("Anda tidak memiliki akses untuk membuat room")
        // }
        return next()
    } catch (e) {
        return res.status(403).json(response(403, null, null, `auth: ${e.message !== "" ? e.message : "kamu tidak memiliki akses ke url ini"} `));
    }
}