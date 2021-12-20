'use strict'
module.exports = function (sequelize, DataTypes) {
  const product = sequelize.define(
    'product',
    {
      productId: {
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      productname: {
        type: DataTypes.STRING,
        allowNull: false
      },
      
    
    },
    {
      timestamps: true,
      underscored: true
    }
  )

  return product;
}