import { DataTypes } from "sequelize";

export default {
    followerID: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    followingID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
    }
}