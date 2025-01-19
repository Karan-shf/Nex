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
    mediaType: {
        type: DataTypes.ENUM("image", "video"),
        allowNull: true
    },
    postType: {
        type: DataTypes.ENUM("Post", "Comment", "Quote"),
        allowNull: false,
    },
    postDate: {
        type: DataTypes.DATE,
        allowNull: false
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
        allowNull: false,
        defaultValue: 0
    },
    views: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    bookmarks: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    comments: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    },
    is_banned: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
    }
}