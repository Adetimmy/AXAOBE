const createCustomer = require('../controllers/customer/createCustomer')
const getCustomer = require('../controllers/customer/getCustomer')
// const { createOrderItem } = require('../controllers/order-items/createOrderItem')
const createOrder = require('../controllers/order/createOrder')
const createProduct = require('../controllers/product/createProduct')
const deleteProduct = require('../controllers/product/deleteProduct')
const getAllProduct = require('../controllers/product/getAllProduct')
const getSingleProduct = require('../controllers/product/getSingleProduct')
const updateProduct = require('../controllers/product/updateProduct')

const router = require('express').Router()

router.route('/customer').post(createCustomer)
router.route('/customer/:id').get(getCustomer)
router.route('/product').post(createProduct).get(getAllProduct)
router.route('/product/:id').get(getSingleProduct).put(updateProduct).delete(deleteProduct)
router.route('/order').post(createOrder)

module.exports = router