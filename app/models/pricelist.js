module.exports = (sequelize, Sequelize) => {
    const PriceList = sequelize.define("PriceList", {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        code: {
            type: Sequelize.STRING
        },
        price:{
            type:Sequelize.INTEGER,
        },
        // year_id:{
        //     type:Sequelize.INTEGER,
        //     references: {
        //         model: 'vehicleyears', // 'fathers' refers to table name
        //         key: 'id', // 'id' refers to column name in fathers table
        //     }
        // },
        // model_id:{
        //     type:Sequelize.INTEGER,
        //     references: {
        //         model: 'vehiclemodels', // 'fathers' refers to table name
        //         key: 'id', // 'id' refers to column name in fathers table
        //     }
        // }

        
    },{
        createdAt: "created_at",
        updatedAt: "updated_at"
    });
  
    return PriceList;
};