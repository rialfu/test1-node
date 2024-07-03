const express = require('express')
const dotenv = require('dotenv');
dotenv.config();
const db = require('./app/models')
const vehicleRoute = require('./routes/vehicle')
const userRoute =require('./routes/user')
const {run}= require('./migration')
const {variableGlobal} = require('./variable')
db.sequelize.sync({ force: true })
.then(() => {
    if(variableGlobal.migration || false){
        run(db)
    }
    console.log("Synced db.");
})
.catch((err) => {
    console.log("Failed to sync db: " + err.message);
});

const app = express()
app.use(express.json());
const port = 3000

app.get('/', (req, res)=>{
    res.status(200).json({'message':'ok'})
})
app.use('/vehicle', vehicleRoute)
app.use('/user',userRoute)

app.listen(variableGlobal.port, () => {
  console.log(`Example app listening on port ${port}`)
})
