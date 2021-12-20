const dbConConfig = require("../config//db.config");
const Sequelize = require("sequelize");
const fs = require('fs');
const path = require('path');
const basename = path.basename(__filename);
const db = {}


const sequelize = new Sequelize(dbConConfig.DB, dbConConfig.USER, dbConConfig.PASSWORD, {
  host: dbConConfig.HOST,
  dialect: dbConConfig.dialect,
  operatorsAliases: false,

  pool: {
    max: dbConConfig.pool.max,
    min: dbConConfig.pool.min,
    acquire: dbConConfig.pool.acquire,
    idle: dbConConfig.pool.idle
  }
});

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    //const model = sequelize['import'](path.join(__dirname, file));
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes)
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.mainCat=require("./mainCat")(sequelize, Sequelize.DataTypes)
db.subCat=require("./subCat")(sequelize, Sequelize.DataTypes)
db.product=require("./product")(sequelize, Sequelize.DataTypes)

db.mainCat.hasMany(db.subCat,{foreignKey:'mainCatId',onDelete: 'cascade',onUpdate:'cascade'})
db.subCat.belongsTo(db.mainCat,{foreignKey:"mainCatId"})

db.subCat.hasMany(db.product,{foreignKey:'subCatId',onDelete: 'cascade',onUpdate:'cascade'})
db.product.belongsTo(db.subCat,{foreignKey:'subCatId'})
module.exports = db;