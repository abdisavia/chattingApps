import jwt from "jsonwebtoken";

export const verifyToken = (token) => {
    let jwtSecret = process.env.JWT_SECRET_KEY;
    const verified = jwt.verify(token, jwtSecret);
    console.log(verified);
    return verified;
}