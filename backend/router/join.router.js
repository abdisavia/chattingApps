import express from "express";
import { getAllUsersInRoom } from "../controller/join.controller.js";

const joinRouter = express.Router();
joinRouter.get("/:roomId/users", getAllUsersInRoom);

export { joinRouter };