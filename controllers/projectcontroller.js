const express = require("express");
const app = express();
const db = require("../models");
const Project = db.projects;

/**
 * Get Projects
 * 
 * @param {*} req 
 * @param {*} res 
 * 
 * @api  api/projects
 */
async function getProjects(req, res) { 

  Project.findAll()
    .then(data => {
      res.send({'projects': data });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials."
      });
    });

}

/**
 * Get Project details
 * 
 * @param {*} req 
 * @param {*} res
 * 
 * @api  api/projects/{project}
 */
async function getProject(req, res) { 

  const id = req.params.id

  Project.findByPk(id)
    .then(data => {
      if (data) {
        res.send({'project' : data});
      } else {
        res.status(404).send({
          message: `Cannot find Project with id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Project with id=" + id
      });
    });
}

/**
 * Register a new Project
 * 
 * @param {*} req 
 * @param {*} res
 * 
 * @api api/projects 
 */
async function registerProject(req, res) {

  const data = {
    name: req.body.name,
    status: req.body.status,
    description: req.body.description,
  };

  // Save Zone in the database
  Project.create(data)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Zone."
      });
    });

}

/**
 * Update Project
 * 
 * @param {*} req 
 * @param {*} res 
 * 
 * @api api/projects/{project}
 */
async function updateProject(req, res) {

  const id = req.params.id;

  Project.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Project was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Project with id=${id}. Maybe Project was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Project with id=" + id
      });
    });

}

/**
 * Delete Project
 * 
 * @param {*} req 
 * @param {*} res
 * 
 * @api api/projects/{project} 
 */
async function deleteProject(req, res) {

  const id = req.params.id;

  Project.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Project was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Project with id=${id}. Maybe Project was not found!`
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
  getProjects,
  getProject,
  registerProject,
  updateProject,
  deleteProject
}