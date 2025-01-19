import { DataTypes } from "sequelize";

export default {
    userID: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    postID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
    }
}