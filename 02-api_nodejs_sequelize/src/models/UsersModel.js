
const { Model, DataTypes } = require('sequelize')

const sequelize = require('../database/index')

class Users extends Model {}

Users.init(
    {
        name_user: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        sequelize,
        modelName: 'users',
        timestamps: true,
        underscored: true,
        underscoredAll: true,
    }
)

module.exports = Users