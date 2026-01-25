import jwt from "jsonwebtoken"

export const createToken = (userData) => {
    if (!userData) throw new Error("user data is required");
    const secret = process.env.JWT_SECRET_KEY;
    return jwt.sign({
        id: userData.id,
        role: userData.role,
        name: userData.name
    }, secret, { expiresIn: '1day' });
}