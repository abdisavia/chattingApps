import { sequelize } from '../config/dbconfig.js';
import { DataTypes } from 'sequelize';

export const JoinModel = sequelize.define('JoinModel', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    role: {
        type: DataTypes.STRING,
        allowNull: false
    }, 
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'users',
            key: 'id'
        },
    },
    roomId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'rooms',
            key: 'id'
        },
    }
}, {
    tableName: 'join_models',
    timestamps: true,
})