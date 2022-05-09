const express = require('express');
const router = express();
const apiIndex = require('../controllers/indexcontroller.js');

/* Auth */
router.get('/',apiIndex.index);

module.exports = router;
