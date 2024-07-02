module.exports = (sequelize, Sequelize) => {
    const VehicleModels = sequelize.define("VehicleModel", {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: Sequelize.STRING
        },
        // type_id:{
        //     type:Sequelize.INTEGER,
        //     references: {
        //         model: 'vehicletypes', // 'fathers' refers to table name
        //         key: 'id', // 'id' refers to column name in fathers table
        //     }
        // }
        
        
    },{
        createdAt: "created_at",
        updatedAt: "updated_at"
    });
  
    return VehicleModels;
};