import { DataTypes } from "sequelize";

export default {
    tag: {
        type: DataTypes.STRING(32),
        allowNull: false
    }
}
