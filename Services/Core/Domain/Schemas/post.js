import { DataTypes } from "sequelize";

export default {
    userID: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    mediaFileName: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: true
    },
    postType: {
        type: DataTypes.ENUM("Post","Comment","Quote"),
        allowNull: false,
    },
    postDate: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: Date.now()
    },
    quotedFrom: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    repliesTo: {
        type: DataTypes.INTEGER,
        allowNull: true
    },
    content: {
        type: DataTypes.STRING(280),
        allowNull: false
    },
    likes: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    views: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    bookmarks: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    is_banned: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    }

}