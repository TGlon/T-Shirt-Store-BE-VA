const express = require('express');
const Cart = require('../controllers/Cart.controller');
const router = express.Router();

router.route('/')
    .post(Cart.create)
    .get(Cart.findAll)
    .delete(Cart.deleteAll)
router.route('/:id')
    .get(Cart.findOne)
    .put(Cart.update)
    .delete(Cart.deleteOne)

module.exports = router;