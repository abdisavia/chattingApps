import express from "express";
import { getUserByEmail } from "../controller/user.controller.js";

const userRouter = express.Router();

userRouter.get("/:email", getUserByEmail);

export { userRouter }