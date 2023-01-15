const express = require('express');
const router = express();
const api = require('../controllers/indexcontroller.js');
const authenticate = require('../controllers/authcontroller.js');
const projects = require('../controllers/projectcontroller.js');
const comments = require('../controllers/commentcontroller.js');
const tasks = require('../controllers/taskcontroller.js');
const users = require('../controllers/usercontroller.js');
const auth = require("../middleware/auth");

router.get('/',api.index);

/* Auth */
router.post('/auth/login', authenticate.login);
router.post('/auth/register', authenticate.register);
router.get('/logout', auth, authenticate.logout);

/* project */
router.get('/projects', auth, projects.getProjects);
router.get('/projects/pending', auth, projects.getPendingProjects);
router.get('/projects/completed',auth, projects.getCompletedProjects);
router.get('/projects/:id', auth, projects.getProject);
router.post('/projects', auth, projects.registerProject);
router.put('/projects/:id', auth, projects.updateProject);
router.put('/projects/:id/complete', auth,  projects.completeProject);
router.put('/projects/:id/cancel', auth, projects.cancelProject);
router.delete('/projects/:id', auth, projects.deleteProject);

/* Task */
router.get('/tasks', auth, tasks.getTasks);
router.get('/tasks/pending', auth, tasks.getPendingTasks);
router.get('/tasks/reviewed', auth, tasks.getReviewedTasks);
router.get('/tasks/rejected', auth, tasks.getRejectedTasks);
router.get('/tasks/completed', auth, tasks.getCompletedTasks);
router.get('/tasks/cancelled', auth, tasks.getCancelledTasks);
router.get('/tasks/accepted',auth, tasks.getAcceptedTasks);
router.get('/tasks/:id', auth, tasks.getTask);
router.post('/tasks', auth, tasks.registerTask);
router.put('/tasks/:id', auth, tasks.updateTask);
router.put('/tasks/:id/accept', auth, tasks.acceptTask);
router.put('/tasks/:id/review', auth, tasks.reviewTask);
router.put('/tasks/:id/reject', auth, tasks.rejectTask);
router.put('/tasks/:id/complete', auth, tasks.completeTask);
router.delete('/tasks/:id', auth, tasks.deleteTask);

/* project */
router.get('/comments', auth, comments.getComments);
router.get('/comments/:id', auth, comments.getComment);
router.post('/comments', auth, comments.registerComment);
router.put('/comments/:id', auth, comments.updateComment);
router.put('/comments/:id/cancel', auth, comments.cancelComment);

/* User */
router.get('/users', users.getUsers);
router.get('/users/deactivated', auth, users.getDeactivatedUsers);
router.get('/users/active', auth, users.getActiveUsers);
router.get('/users/me', auth, users.getProfile);
router.get('/users/:id', auth, users.getUser);
router.put('/users/:id/profile', auth, users.updateUserProfile);
router.put('/users/:id/deactivate', auth, users.deactivateUser);
router.delete('/users/:id', auth, users.deleteUser);

module.exports = router;
