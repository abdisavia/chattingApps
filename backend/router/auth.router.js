import express from 'express';
import { registerUser, loginUser, logout } from '../controller/user.controller.js';
import { verifyCookie } from '../middleware/verifyCookie.middleware.js';
import response from '../utils/response.js';

const authRouter = express.Router();
authRouter.post('/register', registerUser);
authRouter.post('/login', loginUser)
authRouter.post('/verify', verifyCookie, (req, res) => {
    const user = req.user;
    return res.status(200).json(response(200,user,"User is autenticated"))
})

authRouter.post('/logout', logout)


export { authRouter };