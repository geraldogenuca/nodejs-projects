
const { Model, DataTypes } = require('sequelize')

const sequelize = require('../database/index')

class Orders extends Model {}

Orders.init(
    {
        id_user: {
            type: DataTypes.INTEGER,
            allowNull:false,
        },
        id_product: {
            type: DataTypes.INTEGER,
            allowNull:false,
        },
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
    },
    {
        sequelize,
        modelName: 'orders',
        timestamps: true,
        underscored: true,
        underscoredAll: true,
    }
)

module.exports = Orders