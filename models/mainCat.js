'use strict'
module.exports = function (sequelize, DataTypes) {
  const mainCat = sequelize.define(
    'mainCat',
    {
      mainCatId: {
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      categoryname: {
        type: DataTypes.STRING,
        allowNull: false
      },
    },
    {
      timestamps: true,
      underscored: true
    }
  )


  return mainCat;
}