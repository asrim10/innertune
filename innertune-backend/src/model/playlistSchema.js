import { DataTypes } from "sequelize";
import sequelize from "../database/db.js";
import Users from "./userSchema.js";

const Playlist = sequelize.define("Playlist", {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    playlistName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    playlistDesc: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    playlistImg: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Users,
            key: "userId",
        },
    },
});

Playlist.belongsTo(Users, { foreignKey: "user_id" });
Users.hasMany(Playlist, { foreignKey: "user_id" });

export default Playlist;
