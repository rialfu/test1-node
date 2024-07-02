// const dbConfig = require("../config/db.config.js");
const dotenv = require('dotenv');
dotenv.config();
const Sequelize = require("sequelize");
const sequelize = new Sequelize(process.env.db, process.env.user || 'root', process.env.pass, {
    host: process.env.hostdb || '127.0.0.1',
    port:process.env.portdb || 3306,
    dialect: process.env.typedb || 'mysql'
    
});


const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.users = require("./user.js")(sequelize, Sequelize);
db.vehicleBrand = require("./vehicle_brand.js")(sequelize, Sequelize);
db.vehicleType = require("./vehicle_type.js")(sequelize, Sequelize);

db.vehicleModel = require("./vehicle_model.js")(sequelize, Sequelize);
db.vehicleYear = require("./vehicle_year.js")(sequelize, Sequelize);
db.pricelist = require("./pricelist.js")(sequelize, Sequelize);

db.vehicleBrand.hasMany(db.vehicleType, {foreignKey: "brand_id"})
db.vehicleType.belongsTo(db.vehicleBrand,{
    foreignKey: "brand_id",
})

db.vehicleType.hasMany(db.vehicleModel, {foreignKey: "type_id",})
db.vehicleModel.belongsTo(db.vehicleType, {foreignKey: "type_id",})

db.vehicleModel.hasMany(db.pricelist, {foreignKey: "model_id",})
db.vehicleYear.hasMany(db.pricelist, {foreignKey: "year_id",})

db.pricelist.belongsTo(db.vehicleModel, {foreignKey: "model_id",})
db.pricelist.belongsTo(db.vehicleYear, {foreignKey: "year_id",})

module.exports = db;