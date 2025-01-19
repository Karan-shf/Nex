import { DataTypes } from "sequelize";

export default {
    userID: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    postID: {
        type: DataTypes.INTEGER,
        allowNull: false,
    }
}