const express = require('express');
const {getAllUrlsHome} = require('../controllers/url');
const router = express.Router();

router.get("/",getAllUrlsHome)

module.exports = router;