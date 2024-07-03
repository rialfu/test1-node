const express = require('express')
const router = express.Router()
const carsController = require('../app/controller/cars_controller')
const {verifyToken, is_admin} = require('../app/middleware/auth')
const { body } = require('express-validator');
router.get('/', verifyToken, is_admin , (req, res)=>{
    res.json({'message':'vehicle'})
})
router.get('/pricelist', carsController.getPriceList)
router.post('/pricelist', carsController.insertPrice)
router.patch('/pricelist/:code', carsController.updatePrice)
router.delete('/pricelist/:code', carsController.deletePrice)

router.get('/model', carsController.getModelList)
router.post('/model', verifyToken, is_admin, body('name').notEmpty(), body('type_id').notEmpty(), carsController.insertModel)
router.patch('/model/:id', verifyToken, is_admin, body('name').notEmpty(), carsController.updateModel)
router.delete('/model/:id', verifyToken, is_admin, carsController.deleteModel)


// router.route('/brand').get(carsController.getBrandList).post(carsController.insertBrand)
router.get('/brand', carsController.getBrandList)
router.post('/brand',verifyToken, is_admin, body('name').notEmpty(), carsController.insertBrand)
router.patch('/brand/:id',verifyToken, is_admin, body('name').notEmpty(), carsController.updateBrand)
router.delete('/brand/:id',verifyToken, is_admin, carsController.deleteBrand)
// router.delete('/brand/delete')
router.get('/type', carsController.getTypeList)
router.post('/type', verifyToken, is_admin, body('name').notEmpty(), body('brand_id').notEmpty(), carsController.insertType)
router.patch('/type/:id', verifyToken, is_admin, body('name').notEmpty(), carsController.updateType)
router.delete('/type/:id', verifyToken, is_admin, carsController.deleteType)

router.get('/year', carsController.getYearList)
router.post('/year',verifyToken, is_admin, body('year').notEmpty(), carsController.insertYear)
router.patch('/year/:id',verifyToken, is_admin, body('year').notEmpty(), carsController.updateYear)
router.delete('/year/:id',verifyToken, is_admin, carsController.deleteYear)

module.exports = router