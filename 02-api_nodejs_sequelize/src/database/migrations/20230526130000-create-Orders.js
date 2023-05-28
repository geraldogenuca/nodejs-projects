'use strict';

const users = require('../../models/UsersModel')
const products = require('../../models/ProductsModel')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('orders', { 
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false,
        },
        id_user: {
          type: Sequelize.INTEGER,
          allowNull:false,
          references: {
            model: {tableName: 'users'},
            key: 'id'
          }
        },
        id_product: {
          type: Sequelize.INTEGER,
          allowNull:false,
          references: {
            model: {tableName: 'products'},
            key: 'id'
          }
        },
        quantity: {
          type: Sequelize.INTEGER,
          allowNull: false,
        },
        created_at: {
          type: Sequelize.DATE,
          allowNull: false,
          defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        },
        updated_at: {
          type: Sequelize.DATE,
          allowNull: false,
          defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'),
        },
    });     
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('orders');
  }
};
