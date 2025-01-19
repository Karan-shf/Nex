import { DataTypes } from "sequelize";

export default {
    userID: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
    }
}