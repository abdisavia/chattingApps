import { sequelize } from '../config/dbconfig.js';



const createConnection = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection successful.')
        await sequelize.sync({alter:true,logging:false});
        console.log('Database synchronized.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

const closeConnection = async () => {
    try {
        await sequelize.close();
        console.log('Connection closed successfully.');
    } catch (error) {
        console.error('Error closing the connection:', error);
    }
}

export const database = {
    createConnection,
    closeConnection
};