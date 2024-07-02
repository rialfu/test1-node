const db = require('../models')
const {Op, and} = require("sequelize");
const priceList = db.pricelist
const {  validationResult } = require('express-validator');

async function getPriceList(req, res){
    
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
        // let name = req.query.name
        let code = req.query.code
        let priceMore = req.query.pm
        let priceLess = req.query.pl
        whereQuery = {}
        whereYear = {}
        if(code != null){
            whereQuery['code'] ={
                [Op.like]: `%${code}%`
                
            }
        }
        if(priceMore != null){
            whereQuery['price'] = {[Op.gt]:parseInt(priceMore)}
        }
        if(priceLess != null){
            whereQuery['price'] = {[Op.lt]:parseInt(priceLess)}
        }
        let offset = 0 + (page - 1) * limit;
        const result = await priceList.findAndCountAll({
            where: whereQuery,
            offset: offset,
            limit: limit,
            include:[
                {
                    model:db.vehicleYear
                },{
                    model:db.vehicleModel,
                    include:{
                        model:db.vehicleType
                    }
                }
            ]
        });
        res.status(200).json(result)
    }catch(err){
        console.log(err)
        res.status(500).json({'messsage':'something is wrong'})
    }
}

async function insertPrice(req, res){
    try{
        const result = validationResult(req);
        if(!result.isEmpty()){
            return res.status(403).json({err:result.array()})
        }
        const find  = db.pricelist.findOne({where:{code:req.body['code']}})
        if(find != null){
            return res.status(403).json({'message':'duplicate code'})
        }
        await db.pricelist.create({
            price:req.body['price'],
            code:req.body['code'],
            model_id:req.body['brand_id'],
            year_id:req.body['year_id'],
        })
        res.status(200).json({'message':'success'})
    }catch(err){
        res.status(500).json({'messsage':'something is wrong', 'error':err})
    }
}
async function updatePrice(req, res){
    try{
        const result = validationResult(req);
        if(!result.isEmpty()){
            return res.status(403).json({err:result.array()})
        }
        const find = await db.pricelist.findOne({where:{code:req.params['code']}})
        if(find == null){
            res.status(404).json({'messsage':'something is wrong', 'error':'not found'})
            return    
        }
        const update = {}
        if(req.body['price'] != undefined && req.body['price'] !=null){
            update['price'] = req.body['price']
        }
        if(req.body['model_id'] != undefined && req.body['model_id'] !=null){
            update['model_id'] = req.body['model_id']
        }
        if(req.body['year_id'] != undefined && req.body['year_id'] !=null){
            update['year_id'] = req.body['year_id']
        }
        await find.update(update)
        res.status(200).json({'message':'success'})
    }catch(err){
        res.status(500).json({'messsage':'something is wrong', 'error':err})
    }
}
async function deletePrice(req, res){
    try{
        const find = await db.pricelist.findOne({where:{code:req.params['code']}})
        if(find == null){
            res.status(404).json({'messsage':'something is wrong', 'error':'not found'})
            return    
        }
        
        await find.delete(update)
        res.status(200).json({'message':'success'})
    }catch(err){
        res.status(500).json({'messsage':'something is wrong', 'error':err})
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
    insertPrice,
    updatePrice,
    deletePrice,

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