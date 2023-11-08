const express = require('express');
const Account = require('../controllers/Account.controller');
const router = express.Router();

router.route('/')
    .post(Account.create)
    .get(Account.findAll)
router.route('/:id')
    .put(Account.update)
router.route('/:criteria')
    .get(Account.findOne)
module.exports = router;
