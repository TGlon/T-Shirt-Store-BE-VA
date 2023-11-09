const express = require('express');
const router = express.Router();
const productController = require('../controllers/Product.controller');


router.route('/')
    .post(productController.createProduct)
    .get(productController.findAllProducts)
    .delete(productController.deleteAllProducts)
router.route('/:id')
    .get(productController.findOneProduct)
    .put(productController.updateProduct)
    .delete(productController.deleteOneProduct)

module.exports = router;
