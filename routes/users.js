var express = require('express');
var router = express.Router();
var authorization = require('../middleware/jwt.js');
var { deleteuser } = require('../controller/user.controller.js');

router.delete('/delete/:id', authorization, deleteuser);

module.exports = router;
