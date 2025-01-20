import { DataTypes } from "sequelize";

export default {
    tag: {
        type: DataTypes.STRING(32),
        allowNull: false
    },
    tagCount: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    }
}
