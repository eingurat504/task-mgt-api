const express = require("express");
const { check, validationResult } = require('express-validator');
const app = express();
const db = require("../models");
const Task = db.tasks;
const Project = db.projects;
const { roles } = require("../config/roles.js");
 
exports.grantAccess = function(action, resource) {
 return async (req, res, next) => {
  try {
   const permission = roles.can(req.user.role)[action](resource);
   if (!permission.granted) {
    return res.status(401).json({
     error: "You don't have enough permission to perform this action"
    });
   }
   next()
  } catch (error) {
   next(error)
  }
 }
}
 
exports.allowIfLoggedin = async (req, res, next) => {
 try {
  const user = res.locals.loggedInUser;
  if (!user)
   return res.status(401).json({
    error: "You need to be logged in to access this route"
   });
   req.user = user;
   next();
  } catch (error) {
   next(error);
  }
}

/**
 * Get Tasks
 * 
 * @param {*} req 
 * @param {*} res 
 * 
 * @api  api/tasks
 */
async function getTasks(req, res) { 

  Task.findAll({include:'users'})
    .then(data => {
      res.send({'tasks': data });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tasks."
      });
    });

}

/**
 * Get Cpmpleted Tasks
 * 
 * @param {*} req 
 * @param {*} res 
 * 
 * @api  api/tasks/completed
 */
 async function getCompletedTasks(req, res) { 

  Task.findAll({ where: { status: 'completed' }  })
    .then(data => {
      res.send({'completed_tasks': data });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tasks."
      });
    });

}

/**
 * Get Pending tasks
 * 
 * @param {*} req 
 * @param {*} res 
 * 
 * @api  api/tasks/pending
 */
 async function getPendingTasks(req, res) { 

  Task.findAll({ where: { status: 'pending' }  })
    .then(data => {
      res.send({'pending_tasks': data });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tasks."
      });
    });

}

/**
 * Get Accepted tasks
 * 
 * @param {*} req 
 * @param {*} res 
 * 
 * @api  api/tasks/accepted
 */
 async function getAcceptedTasks(req, res) { 

  Task.findAll({ where: { status: 'accepted' }  })
    .then(data => {
      res.send({'accepted_tasks': data });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tasks."
      });
    });
}

/**
 * Get Reviewed tasks
 * 
 * @param {*} req 
 * @param {*} res 
 * 
 * @api  api/tasks/reviewed
 */
 async function getReviewedTasks(req, res) { 

  Task.findAll({ where: { status: 'reviewed' }  })
    .then(data => {
      res.send({'reviewed_tasks': data });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tasks."
      });
    });
}

/**
 * Get Rejected tasks
 * 
 * @param {*} req 
 * @param {*} res 
 * 
 * @api  api/tasks/rejected
 */
 async function getRejectedTasks(req, res) { 

  Task.findAll({ where: { status: 'rejected' }  })
    .then(data => {
      res.send({'rejected_tasks': data });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tasks."
      });
    });
}

/**
 * Get Cancelled tasks
 * 
 * @param {*} req 
 * @param {*} res 
 * 
 * @api  api/tasks/cancelled
 */
 async function getCancelledTasks(req, res) { 

  Task.findAll({ where: { status: 'cancelled' }  })
    .then(data => {
      res.send({'cancelled_tasks': data });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving cancelled tasks."
      });
    });
}

/**
 * Get Task details
 * 
 * @param {*} req 
 * @param {*} res
 * 
 * @api  api/tasks/{task}
 */
async function getTask(req, res) { 

  const id = req.params.id

  Task.findByPk(id)
    .then(data => {
      if (data) {
        res.send({'task' : data});
      } else {
        res.status(404).send({
          message: `Cannot find task with id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving task with id=" + id
      });
    });
}

/**
 * Register a new task
 * 
 * @param {*} req 
 * @param {*} res
 * 
 * @api api/tasks 
 */
async function registerTask(req, res) {

  await check('name').notEmpty()
  .withMessage('Name is Required').run(req);

  await check('project_id').notEmpty()
  .withMessage('Project ID is Required').run(req);

  const result = validationResult(req);

  if (!result.isEmpty()) {
      return res.status(422).json({ 
      errors: result.array() 
      });
  }

  const data = {
    name: req.body.name,
    projectId: req.body.project_id,
    status: req.body.status,
    description: req.body.description,
    createdBy: req.body.user_id,
    remarks: req.body.remarks,
  };

  // Get task input   
  const task_name = req.body.name;

  // Validate if task already exists
  let task = await Task.findOne({ where: {
    name : task_name
  } });

  if (task) {
    return res.status(200).json({
      errors: [
        {
          name: task.name,
          msg: "The task already exists"
        },
      ],
    });
  }

  const project_id = req.body.project_id;

   // Validate if project exists
  let project = await Project.findOne({ where: { id: project_id } });

  if (project == null) {
    return res.status(200).json({
      errors: [
        {
          id: project_id,
          msg: "The Project ID does not exist"
        },
      ],
    });
  }

  // Save Task in the database
  Task.create(data)
    .then(data => {
      res.status(201).send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Zone."
      });
    });

}

/**
 * Accept Task
 * 
 * @param {*} req 
 * @param {*} res 
 * 
 * @api api/tasks/{task}/accept
 */
 async function acceptTask(req, res) {

  const id = req.params.id;

  Task.update(req.body, {
    where: { id: id, status: 'pending' }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "task was accepted successfully."
        });
      } else {
        res.send({
          message: `Cannot update task with id=${id}. Maybe task was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating task with id=" + id
      });
    });

}

/**
 * Review Task
 * 
 * @param {*} req 
 * @param {*} res 
 * 
 * @api api/tasks/{task}/review
 */
 async function reviewTask(req, res) {

  const id = req.params.id;

  Task.update(req.body, {
    where: { id: id, status: 'accepted' }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "task was reviewed successfully."
        });
      } else {
        res.send({
          message: `Cannot update task with id=${id}. Maybe task was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating task with id=" + id
      });
    });

}

/**
 * Complete Task
 * 
 * @param {*} req 
 * @param {*} res 
 * 
 * @api api/tasks/{task}/complete
 */
 async function completeTask(req, res) {

  const id = req.params.id;

  Task.update(req.body, {
    where: { id: id, status: 'reviewed' }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "task was completed successfully."
        });
      } else {
        res.send({
          message: `Cannot update task with id=${id}. Maybe task was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating task with id=" + id
      });
    });

}

/**
 * Cancel Task
 * 
 * @param {*} req 
 * @param {*} res 
 * 
 * @api api/tasks/{task}/complete
 */
 async function cancelTask(req, res) {

  const id = req.params.id;

  Task.update(req.body, {
    where: { id: id, status: 'cancelled' }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "task was cancelled successfully."
        });
      } else {
        res.send({
          message: `Cannot cancel task with id=${id}. Maybe task was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error cancelling task with id=" + id
      });
    });

}

/**
 * Update Task
 * 
 * @param {*} req 
 * @param {*} res 
 * 
 * @api api/tasks/{task}
 */
async function updateTask(req, res) {

  const id = req.params.id;

  Task.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "task was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update task with id=${id}. Maybe task was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating task with id=" + id
      });
    });

}

/**
 * Reject task
 * 
 * @param {*} req 
 * @param {*} res
 * 
 * @api api/tasks/{task}/reject 
 */
 async function rejectTask(req, res) {

  const id = req.params.id;

  Task.update(req.body, {
    where: { id: id, status: 'accepted' }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "task was rejected successfully."
        });
      } else {
        res.send({
          message: `Cannot update task with id=${id}. Maybe task was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating task with id=" + id
      });
    });
}

/**
 * Delete task
 * 
 * @param {*} req 
 * @param {*} res
 * 
 * @api api/tasks/{task} 
 */
async function deleteTask(req, res) {

  const id = req.params.id;

  Task.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "task was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete task with id=${id}. Maybe task was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Task with id=" + id
      });
    });

}

module.exports = {
  getTasks,
  getTask,
  registerTask,
  getCompletedTasks,
  getRejectedTasks,
  getReviewedTasks,
  getCancelledTasks,
  getPendingTasks,
  getAcceptedTasks,
  updateTask,
  acceptTask,
  completeTask,
  cancelTask,
  reviewTask,
  rejectTask,
  deleteTask
}