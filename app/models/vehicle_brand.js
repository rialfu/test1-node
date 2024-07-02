module.exports = (sequelize, Sequelize) => {
    const VehicleBrands = sequelize.define("VehicleBrand", {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: Sequelize.STRING
        },
        
    },{
        createdAt: "created_at",
        updatedAt: "updated_at",
        
    });
  
    return VehicleBrands;
};