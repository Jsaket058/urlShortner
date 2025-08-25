const express = require('express');
const {generateNewShortURL,redirectToShorternUrl,getUrlStats} = require('../controllers/url');
const router = express.Router();

router.post("/", generateNewShortURL);
router.get('/:shortId',redirectToShorternUrl);
router.get('/stats/:shortId',getUrlStats);
module.exports = router;