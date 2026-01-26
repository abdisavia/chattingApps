import { sequelize } from "../config/dbconfig.js";
import { DataTypes } from "sequelize";
import { users } from "./userModel.js";
import { Attachments } from "./attachmentsModel.js";

export const Messages = sequelize.define('Message', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    type: {
        type: DataTypes.STRING,
        allowNull: false  
    },
    message: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    attachmentsId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
            model: Attachments,
            key: 'id'
        }
    },
    senderId: {
        type: DataTypes.INTEGER,
        references: {
            model: users,
            key: 'id'
        }
    }, 
    roomId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: "rooms",
            key:'id'
        }
    }
}, {
    tableName: 'messages',
    timestamps: true,
});

