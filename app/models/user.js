module.exports = (sequelize, Sequelize) => {
    const Users = sequelize.define("User", {
        id: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        email:{
            type: Sequelize.STRING,
            unique: true
        },
        name: {
            type: Sequelize.STRING
        },
        pass:{
            type: Sequelize.STRING,
        },
        is_admin: {
            type: Sequelize.BOOLEAN, 
            defaultValue: false
        },
        updatedAt: {
            type: Sequelize.DATE,
            // defaultValue: sequelize.literal('CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3)'),
            field: 'updated_at',
            allowNull:true
        },
    },{
        createdAt: "created_at",
        // updatedAt: "updated_at"
    });
  
    return Users;
};