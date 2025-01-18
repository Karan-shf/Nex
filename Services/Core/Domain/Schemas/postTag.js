import { DataTypes } from "sequelize";

export default {
    tagID: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    postID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
    }
}