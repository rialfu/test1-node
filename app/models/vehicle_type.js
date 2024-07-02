module.exports = (sequelize, Sequelize) => {
    const VehicleTypes = sequelize.define("VehicleType", {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: Sequelize.STRING
        },
        // brand_id:{
        //     type:Sequelize.INTEGER,
        //     references: {
        //         model: 'vehiclebrands', // 'fathers' refers to table name
        //         key: 'id', // 'id' refers to column name in fathers table
        //     }
        // }
        
    },{
        createdAt: "created_at",
        updatedAt: "updated_at"
    });
    
    return VehicleTypes;
};