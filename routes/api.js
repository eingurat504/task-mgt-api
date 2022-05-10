const express = require('express');
const router = express();
const api = require('../controllers/indexcontroller.js');
const projects = require('../controllers/projectcontroller.js');
const tasks = require('../controllers/taskcontroller.js');

router.get('/',api.index);

/* project */
router.get('/projects', projects.getProjects);
router.get('/projects/pending', projects.getPendingProjects);
router.get('/projects/completed', projects.getCompletedProjects);
router.get('/projects/:id', projects.getProject);
router.post('/projects', projects.registerProject);
router.put('/projects/:id', projects.updateProject);
router.delete('/projects/:id', projects.deleteProject);

/* Task */
router.get('/tasks', tasks.getTasks);
router.get('/tasks/pending', tasks.getPendingTasks);
router.get('/tasks/completed', tasks.getCompletedTasks);
router.get('/tasks/accepted', tasks.getAcceptedTasks);
router.get('/tasks/:id', tasks.getTask);
router.post('/tasks', tasks.registerTask);
router.put('/tasks/:id', tasks.updateTask);
router.put('/tasks/:id/accept', tasks.acceptTask);
router.put('/tasks/:id/complete', tasks.completeTask);
router.delete('/tasks/:id', tasks.deleteTask);

module.exports = router;
