const express = require("express");
const router = express.Router();
const roleController = require("../controllers/Role.controller");

router.route('/')
    .post(roleController.createRole);

module.exports = router;
