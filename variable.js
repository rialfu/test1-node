const dotenv = require('dotenv');
dotenv.config();

const variableGlobal ={
    database:{
        name_db : process.env.db || 'test_kendaraan',
        user    : process.env.user || 'root',
        pass    : process.env.pass_db || '',
        port    : process.env.port_db || '3306',
        host    : process.env.host_db || '127.0.0.1',
        type_db : process.env.type_db || 'mysql',
    },
    port : process.env.port || '3000',
    migration : process.env.migration || 'true',
}
module.exports = {
    variableGlobal
}