
const { Model, DataTypes } = require('sequelize')

const sequelize = require('../database/index')

class Products extends Model {}

Products.init(
    {
        name_product: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        price: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },        
        image:{
            type: DataTypes.STRING,
            allowNull: true,
        }        
    },
    {
        sequelize,
        modelName: 'products',
        timestamps: true,
        underscored: true,
        underscoredAll: true,
    } 
)

module.exports = Products