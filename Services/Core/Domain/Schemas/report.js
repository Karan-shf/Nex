import { DataTypes } from "sequelize";

export default {
    reportedID: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    userID: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    reportType: {
        type: DataTypes.ENUM("Hate Speech","Harassment","Violent Speech","Child Safety","Privacy","Spam"),
        allowNull: false
    },
    furtherExplanations: {
        type: DataTypes.STRING(400),
        allowNull: false
    },
    reportType: {
        type: DataTypes.ENUM("Pending","Accepted","Ignored"),
        allowNull: false,
        defaultValue: "Pending"
    }
}
