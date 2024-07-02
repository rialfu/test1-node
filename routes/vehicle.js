const express = require('express')
const router = express.Router()
const carsController = require('../app/controller/cars_controller')
const {verifyToken, is_admin} = require('../app/middleware/auth')
const { body } = require('express-validator');
router.get('/', verifyToken, is_admin , (req, res)=>{
    res.json({'message':'vehicle'})
})
router.get('/pricelist', carsController.getPriceList)
// router.post('/pricelist')
// router.put('/pricelist/update')
// router.delete('/pricelist/delete')

router.get('/model', carsController.getModelList)
router.post('/model/:type_id', verifyToken, is_admin, carsController.insertModel)
router.patch('/model/:id', verifyToken, is_admin, carsController.updateModel)
router.delete('/model/:id', verifyToken, is_admin, carsController.deleteModel)


// router.route('/brand').get(carsController.getBrandList).post(carsController.insertBrand)
router.get('/brand', carsController.getBrandList)
// router.get('/brand/:id', carsController.)
router.post('/brand',verifyToken, is_admin, body('name').notEmpty(), carsController.insertBrand)
router.patch('/brand/:id',verifyToken, is_admin, body('name').notEmpty(), carsController.updateBrand)
router.delete('/brand/:id',verifyToken, is_admin, carsController.deleteBrand)
// router.delete('/brand/delete')
router.get('/type', carsController.getTypeList)
router.post('/type/:brand_id', verifyToken, is_admin, body('name').notEmpty(), carsController.insertType)
router.patch('/type/:id', verifyToken, is_admin, body('name').notEmpty(), carsController.updateType)
router.delete('/type/:id', verifyToken, is_admin, body('name').notEmpty(), carsController.deleteType)


module.exports = router