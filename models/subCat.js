'use strict'
module.exports = function (sequelize, DataTypes) {
  const subCat = sequelize.define(
    'subCat',
    {
      subCatId: {
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      categoryname: {              // we can also use array type in here eg food=[hot,cool,..]
        type: DataTypes.STRING,
        allowNull: false
      },
    },
    {
      timestamps: true,
      underscored: true
    }
  )
  return subCat;
}