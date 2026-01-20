import { sequelize } from "../config/dbconfig.js";
import { DataTypes } from "sequelize";

export const Rooms = sequelize.define('Room', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    type: {
        type: DataTypes.STRING,
        allowNull: false
    },
    room_name: {
        type: DataTypes.STRING,
        allowNull: true
    },
    created_by: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'users',
            key:'id'
        }
    }
}, {
    tableName: 'rooms',
    timestamps: true,
});

