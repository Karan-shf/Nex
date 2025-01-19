import { DataTypes } from "sequelize";

export default {
    tagID: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
    }
}