const db = require('../models')
const {Op} = require("sequelize");
const priceList = db.pricelist
const {  validationResult } = require('express-validator');

async function getPriceList(req, res){
    
    try{
        const result = await priceList.findAll()

        res.status(200).json(result)
    }catch(err){
        res.status(500).json({'messsage':'something is wrong'})
    }
}
async function getBrandList(req, res){
    try{

        let page = req.query.page
        if (page ==null){
            page = 1
        }else{
            page = parseInt(page)
        }
        let limit = req.query.limit
        if( limit == null || limit > 50){
            limit = 10
        }else{
            limit = parseInt(limit)
        }
        let name = req.query.name
        whereQuery = {}
        if(name != null){
            whereQuery['name'] ={
                [Op.like]: `%${name}%`
                
            }
        }
        let offset = 0 + (page - 1) * limit;
        const result =  await db.vehicleBrand.findAndCountAll({
            where: whereQuery,
            offset: offset,
            limit: limit,
        });
        res.status(200).json({'result':result})
    }catch(err){
        res.status(500).json({'messsage':'something is wrong', 'error':err})
    }
    
}
async function insertBrand(req, res){
    try{
        const result = validationResult(req);
        if(!result.isEmpty()){
            return res.status(403).json({err:result.array()})
        }
        await db.vehicleBrand.create({
            name:req.body['name']
        })
        res.status(200).json({'message':'success'})
    }catch(err){
        res.status(500).json({'messsage':'something is wrong', 'error':err})
    }
}
async function updateBrand(req, res){
    try{
        const result = validationResult(req);
        if(!result.isEmpty()){
            return res.status(403).json({err:result.array()})
        }
        const find = await db.vehicleBrand.findOne({where:{id:req.params['id']}})
        if(find == null){
            res.status(404).json({'messsage':'something is wrong', 'error':'not found'})
            return    
        }
        await find.update({name:req.body['name']})
        // await db.vehicleBrand.create({
        //     name:req.body['name']
        // })
        res.status(200).json({'message':'success'})
    }catch(err){
        res.status(500).json({'messsage':'something is wrong', 'error':err})
    }
}
async function deleteBrand(req, res){
    try{
        const find = await db.vehicleBrand.findOne(
            {
                where:{id:req.params['id']},
                include:[
                    {
                        model:db.vehicleType,
                        limit:10
                    }
                ]
            }
        )
        if(find == null){
            res.status(404).json({'messsage':'something is wrong', 'error':'not found'})
            return    
        }
        if(find['VehicleTypes'].length > 0){
            res.status(406).json({'message':'sorry we cant delete because this brand has type'})
            return    
        }
        await find.destroy()
        res.status(200).json({'message':'success'})
    }catch(err){
        res.status(500).json({'messsage':'something is wrong', 'error':err})
    }
}

async function getTypeList(req, res){
    try{
        let page = req.query.page
        if (page ==null){
            page = 1
        }else{
            page = parseInt(page)
        }
        let limit = req.query.limit
        if( limit == null || limit > 50){
            limit = 10
        }else{
            limit = parseInt(limit)
        }
        let name = req.query.name
        whereQuery = {}
        if(name != null){
            whereQuery['name'] ={
                [Op.like]: `%${name}%`
                
            }
        }
        let offset = 0 + (page - 1) * limit;
        const result =  await db.vehicleType.findAndCountAll({
            where: whereQuery,
            offset: offset,
            limit: limit,
            include:[db.vehicleBrand]
        });
        res.status(200).json({'result':result})
        
    }catch(err){
        res.status(500).json({'messsage':'something is wrong', 'error':err})
    }
}


async function insertType(req, res){
    try{
        const result = validationResult(req);
        if(!result.isEmpty()){
            return res.status(403).json({err:result.array()})
        }
        await db.vehicleType.create({
            name:req.body['name'],
            brand_id:req.params['brand_id']
        })
        res.status(200).json({'message':'success'})
    }catch(err){
        res.status(500).json({'messsage':'something is wrong', 'error':err})
    }
}
async function updateType(req, res){
    try{
        const result = validationResult(req);
        if(!result.isEmpty()){
            return res.status(403).json({err:result.array()})
        }
        const find = await db.vehicleType.findOne({where:{id:req.params['id']}})
        if(find == null){
            res.status(404).json({'messsage':'something is wrong', 'error':'not found'})
            return    
        }
        await find.update({name:req.body['name']})
        // await db.vehicleBrand.create({
        //     name:req.body['name']
        // })
        res.status(200).json({'message':'success'})
    }catch(err){
        res.status(500).json({'messsage':'something is wrong', 'error':err})
    }
}
async function deleteType(req, res){
    try{
        const find = await db.vehicleType.findOne(
            {
                where:{id:req.params['id']},
                include:[
                    {
                        model: db.vehicleModel,
                        limit:10
                    }
                ]
            }
        )
        if(find == null){
            res.status(404).json({'messsage':'something is wrong', 'error':'not found'})
            return    
        }
        if(find['VehicleModels'].length > 0){
            res.status(406).json({'message':'sorry we cant delete because this type has model'})
            return    
        }
        await find.destroy()
        res.status(200).json({'message':'success'})
    }catch(err){
        res.status(500).json({'messsage':'something is wrong', 'error':err})
    }
}

async function getModelList(req, res){
    try{
        let page = req.query.page
        if (page ==null){
            page = 1
        }else{
            page = parseInt(page)
        }
        let limit = req.query.limit
        if( limit == null || limit > 50){
            limit = 10
        }else{
            limit = parseInt(limit)
        }
        let name = req.query.name
        whereQuery = {}
        if(name != null){
            whereQuery['name'] ={
                [Op.like]: `%${name}%`
                
            }
        }
        let offset = 0 + (page - 1) * limit;
        
        const result =  await db.vehicleModel.findAndCountAll({
            where: whereQuery,
            offset: offset,
            limit: limit,
            include:[
                {
                    model:db.vehicleType,
                    include:db.vehicleBrand
                
                } 
            ]
        });
        res.status(200).json({'result':result})
        
    }catch(err){
        res.status(500).json({'messsage':'something is wrong', 'error':err})
    }
}

async function insertModel(req, res){
    try{
        const result = validationResult(req);
        if(!result.isEmpty()){
            return res.status(403).json({err:result.array()})
        }
        await db.vehicleModel.create({
            name:req.body['name'],
            type_id:req.params['type_id']
        })
        res.status(200).json({'message':'success'})
    }catch(err){
        res.status(500).json({'messsage':'something is wrong', 'error':err})
    }
}
async function updateModel(req, res){
    try{
        const result = validationResult(req);
        if(!result.isEmpty()){
            return res.status(403).json({err:result.array()})
        }
        const find = await db.vehicleModel.findOne({where:{id:req.params['id']}})
        if(find == null){
            res.status(404).json({'messsage':'something is wrong', 'error':'not found'})
            return    
        }
        await find.update({name:req.body['name']})
        // await db.vehicleBrand.create({
        //     name:req.body['name']
        // })
        res.status(200).json({'message':'success'})
    }catch(err){
        res.status(500).json({'messsage':'something is wrong', 'error':err})
    }
}
async function deleteModel(req, res){
    try{
        const find = await db.vehicleModel.findOne(
            {
                where:{id:req.params['id']},
                include:[
                    {
                        model:db.pricelist,
                        limit:10,
                    }
                ]
            }
        )
        if(find == null){
            res.status(404).json({'messsage':'something is wrong', 'error':'not found'})
            return    
        }
        if(find['PriceLists'].length > 0){
            res.status(406).json({'message':'sorry we cant delete because this type has pricelist'})
            return    
        }
        await find.destroy()
        res.status(200).json({'message':'success', 'result':find})
    }catch(err){
        res.status(500).json({'messsage':'something is wrong', 'error':err})
    }
}

module.exports={
    getPriceList,
    getBrandList,

    insertBrand,
    updateBrand,
    deleteBrand,

    getTypeList,
    insertType,
    updateType,
    deleteType,

    getModelList,
    insertModel,
    updateModel,
    deleteModel
}