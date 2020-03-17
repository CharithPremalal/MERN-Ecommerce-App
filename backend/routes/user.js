const express = require('express')

const router = express.Router()


const {sayhi} = require("../controllers/user")

router.get('/', sayhi);


module.exports = router;