// import important parts of sequelize library
const { Model, DataTypes } = require('sequelize');
// import our database connection from config.js
const sequelize = require('../config/connection');

// Initialize Product model (table) by extending off Sequelize's Model class
class Product extends Model {}

// set up fields and rules for Product model
Product.init(
  {
     id: {
       type: DataTypes.INTEGER,
       allowNull: false,
       primaryKey: true,
       auto_increment: true
       },

     produce_name: {
       type: DataTypes.STRING,
       allowNull: false
       },

     category_id: {
       type: DataTypes.INTEGER,
           references: {
               model: 'category',
               key: 'id',
               unique: false
               }
       }, 
       
     stock: {
       type: DataTypes.INTEGER,
       allowNull: false,
       defaultValue: 5,
       validate: { isNumeric: true, }
       }, 

     price: {
       type: DataTypes.DECIMAL,
       allowNull: true,
       validate: { isDecimal: true }
       },  
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'product',
  }
);

module.exports = Product;
