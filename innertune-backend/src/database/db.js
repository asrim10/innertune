import { Sequelize } from "sequelize";
import dotenv from 'dotenv';
dotenv.config();

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
    host: process.env.DB_HOST,
    dialect: 'postgres'
});

export const Connection = async ()=>{
    try {
        await sequelize.authenticate();
        console.log("Connection establised");
        await sequelize.sync();
    } catch (error) {
        console.log("An error occured",error);
    }
}

export default sequelize;