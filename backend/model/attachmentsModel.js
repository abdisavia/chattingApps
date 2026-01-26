import { sequelize } from '../config/dbconfig.js';
import { DataTypes } from 'sequelize';

export const Attachments = sequelize.define('Attachments', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    fileName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    mimeType: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    tableName: 'attachments',
    timestamps: true,
});
