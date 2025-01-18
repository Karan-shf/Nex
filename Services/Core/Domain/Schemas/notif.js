import { DataTypes } from "sequelize";

export default {
    userID: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    content: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    isSeen: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    }
}