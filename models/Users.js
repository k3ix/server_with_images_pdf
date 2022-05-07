module.exports = (sequelize, DataTypes) => {
    const Users = sequelize.define("Users", {
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        firstName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: false
        },
        image: {
            type: DataTypes.TEXT('long'),
            allowNull: false
        },
        pdf: {
            type: DataTypes.BLOB('long'),
            allowNull: true
        },
        image_ext: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });

    return Users;
};