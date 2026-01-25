import express from 'express';
import { create, getAllRooms, getById } from '../controller/room.controller.js';

const roomRouter = express.Router();

roomRouter.get("/:id", getById)
roomRouter.post('/', create)
roomRouter.get('/', getAllRooms)

export {roomRouter}