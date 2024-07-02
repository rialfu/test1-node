module.exports = (sequelize, Sequelize) => {
    const VehicleYears = sequelize.define("VehicleYear", {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        year: {
            type: Sequelize.STRING(4)
        }
        
    },{
        createdAt: "created_at",
        updatedAt: "updated_at"
    });
  
    return VehicleYears;
};