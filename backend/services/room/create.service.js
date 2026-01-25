import { Rooms } from '../../model/roomModel.js';
import { roomSchema } from '../../validators/room.validator.js';

export const createRoom = async (roomData, transaction) => {
    if (!roomData) throw new Error("Room data is required");
    console.log(roomData);
    const validation = roomSchema.validate(roomData,{abortEarly:false});
    if (validation?.error) throw new Error(validation.error);

    if (transaction) {
        return Rooms.create(roomData, { transaction:transaction });
    } else {
        return Rooms.create(roomData);
    }
}
