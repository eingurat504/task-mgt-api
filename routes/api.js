const express = require('express');
const router = express();
const api = require('../controllers/indexcontroller.js');
const projects = require('../controllers/projectcontroller.js');


router.get('/',api.index);

/* project */
router.get('/projects', projects.getProjects);
router.get('/projects/:id', projects.getProject);
router.post('/projects', projects.registerProject);
router.put('/projects/:id', projects.updateProject);
router.delete('/projects/:id', projects.deleteProject);

module.exports = router;
