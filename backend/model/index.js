import { Messages } from '../model/messageModel.js';
import { users } from '../model/userModel.js';
import { Attachments } from '../model/attachmentsModel.js';
import { JoinModel } from '../model/JoinModel.js';
import { Rooms } from '../model/roomModel.js';

const defineAssociations = () => {
    users.hasMany(Messages, { foreignKey: 'senderId' });
    users.belongsToMany(Rooms, { through: JoinModel, foreignKey: 'userId' });
    Rooms.belongsToMany(users, { through: JoinModel, foreignKey: 'roomId' });
    Rooms.hasMany(Messages, { foreignKey: 'roomId' });
    Messages.belongsTo(users, {foreignKey: 'senderId'});
    Messages.belongsTo(Rooms, { foreignKey: 'roomId' });
    Messages.hasMany(Attachments, { foreignKey: 'attachmentId' });
    Attachments.belongsTo(Messages, { foreignKey: 'attachmentId' });
};

export const models = {
    users: users,
    Rooms:Rooms,
    Messages:Messages,
    Attachments:Attachments,
    Join:JoinModel,
    defineAssociations
}

    
