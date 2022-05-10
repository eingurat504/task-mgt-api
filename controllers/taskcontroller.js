const express = require("express");
const app = express();
const db = require("../models");
const Task = db.tasks;

/**
 * Get tasks
 * 
 * @param {*} req 
 * @param {*} res 
 * 
 * @api  api/tasks
 */
async function getTasks(req, res) { 

  Task.findAll()
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
 * Get tasks
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

  const data = {
    name: req.body.name,
    status: req.body.status,
    description: req.body.description,
  };

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
  getPendingTasks,
  updateTask,
  getAcceptedTasks,
  deleteTask
}