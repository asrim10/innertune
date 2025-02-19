import { DataTypes } from "sequelize";
import sequelize from "../database/db.js";
const Song = sequelize.define("Song", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    image_url: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    album: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    duration: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    audio_url: {
        type: DataTypes.STRING,
        allowNull: false,
    },
});

export default Song;