const {faker}= require('@faker-js/faker')
const bcrypt = require("bcrypt");
const { is_admin } = require('../app/middleware/auth');
// const user = db.users
async function run(db){
    const data = []
    for(let i=0; i<10; i++){
        const name = faker.person.fullName();
        const email = faker.internet.email();
        const pass = await bcrypt.hash('123456', 2)
        const is_admin = random(0, 1)
        data.push({name, email, pass, is_admin})
    }
    data.push({'name':'rema', 'email':'rema@test.com','pass': await bcrypt.hash('123456', 2), is_admin : 1})
    const users = await db.users.bulkCreate(data)
    // console.log(users)
    const brands = await db.vehicleBrand.bulkCreate([{'name':'Ferrari'}, {'name':'mercedes'}, {'name':'tesla'}])
    const dataTypes = []
    for(let j=0;j< 10;j++){
        dataTypes.push({
            'name':faker.definitions.vehicle.type[random(0,6)],
            'brand_id':random(1,3)
        })
    }
    // console.log(dataTypes)
    await db.vehicleType.bulkCreate(dataTypes)
    const dataModels = []
    for(let j=0;j< 20;j++){
        dataModels.push({
            'name':faker.definitions.vehicle.model[random(0,20)],
            'type_id':random(1,10)
        })
    }
    await db.vehicleModel.bulkCreate(dataModels)
    const dataYears = []
    let now =2010
    for(let i=0;i<10;i++){
        dataYears.push({'year':now})
        now++
    }
    await db.vehicleYear.bulkCreate(dataYears)
    const dataPrice = []
    for(let i=0;i < 20;i++){
        dataPrice.push({
            'code':makeid(10),
            'year_id':random(1,10),
            'model_id':random(1,20),
            'price':random(1,20) * 10000
        })
    }
    // console.log(dataPrice)
    // db.pricelist.create({'code':makeid(10), 'year_id':1,'model_id':1, 'price':random(1,20)*10000})
    await db.pricelist.bulkCreate(dataPrice)
   

}
function random(min, max){
    // min = 0
    // max = 1
    return  Math.floor(Math.random() * (max - min + 1)) + min;
}
async function createRandomUser() {
    const name = faker.string.name;
    const email = faker.internet.email();
    const pass = await bcrypt.hash('123456', 2)
    return {
      name, email, pass
    };
}
function makeid(length) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return result;
}
module.exports = {
    run
}
