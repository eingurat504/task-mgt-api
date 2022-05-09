const express = require('express');
const router = express();
const apiIndex = require('../controllers/indexcontroller.js');

router.get('/',apiIndex.index);