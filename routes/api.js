const express = require('express');
const router = express();
const api = require('../controllers/indexcontroller.js');
const projects = require('../controllers/projectcontroller.js');

/* Auth */
router.get('/',api.index);
router.get('/projects', projects.getProjects);

module.exports = router;
