const createCustomer = require('../controllers/createCustomer')

const router = require('express').Router()

router.route('/create-customer').post(createCustomer)

module.exports = router