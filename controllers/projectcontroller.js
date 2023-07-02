const express = require("express");
const { check, validationResult } = require('express-validator');
const app = express();
const db = require("../models");
const Project = db.projects;
const User = db.users;
const { roles } = require("../config/roles.js");
 
exports.grantAccess = async function(action, resource) {
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
 * Get Projects
 * 
 * @param {*} req 
 * @param {*} res 
 * 
 * @api  api/projects
 */
async function getProjects(req, res) { 
  Project.findAll({includes:'users'})
    .then(data => {
      res.send({'projects': data });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving projects."
      });
    });

}

/**
 * Get Projects
 * 
 * @param {*} req 
 * @param {*} res 
 * 
 * @api  api/projects/completed
 */
 async function getCompletedProjects(req, res) { 

  Project.findAll({ where: { status: 'completed' }  })
    .then(data => {
      res.send({'completed_projects': data });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving projects."
      });
    });

}

/**
 * Get Pending Projects
 * 
 * @param {*} req 
 * @param {*} res 
 * 
 * @api  api/projects/pending
 */
 async function getPendingProjects(req, res) { 

  Project.findAll({ where: { status: 'pending' }  })
    .then(data => {
      res.send({'pending_projects': data });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving projects."
      });
    });

}

/**
 * Get Canccelled Projects
 * 
 * @param {*} req 
 * @param {*} res 
 * 
 * @api  api/projects/pending
 */
 async function getCancelledProjects(req, res) { 

  Project.findAll({ where: { status: 'cancelled' }  })
    .then(data => {
      res.send({'cancelled_projects': data });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving cancelled projects."
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

    await check('name').notEmpty()
    .withMessage('Name is Required').run(req);

    const result = validationResult(req);

    if (!result.isEmpty()) {
        return res.status(422).json({ 
        errors: result.array() 
        });
    }
  
  // Get project input   
  const project_name = req.body.name;

  // Validate if project already exists
  let project = await Project.findOne({ where: {
    name : project_name
  } });

  if (project) {
    return res.status(200).json({
      errors: [
        {
          name: project.name,
          msg: "The project already exists"
        },
      ],
    });
  }

  // Get user input   
  const user_id = req.body.userId;

  // Validate if user already exists
  let user = await User.findOne({ where: {
    id : user_id
  } });

  if (user) {
    return res.status(422).json({
      errors: [
        {
          name: user.id,
          msg: "User exists"
        },
      ],
    });
  } else{
    return res.status(400).json({ errors: [ { msg: "Unknow user" }]});
  }

  const data = {
    name: req.body.name,
    userId: user.id,
    status: req.body.status,
    description: req.body.description,
  };


  // Save Project in the datbase
  Project.create(data)
    .then(data => {
      res.status(201).send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Project."
      });
    });

}

/**
 * Complete Project
 * 
 * @param {*} req 
 * @param {*} res 
 * 
 * @api api/projects/{project}/complete
 */
 async function completeProject(req, res) {

  const id = req.params.id;

  Project.update(req.body, {
    where: { id: id, status: 'pending' }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Project was completed successfully."
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
 * Cancel Project
 * 
 * @param {*} req 
 * @param {*} res 
 * 
 * @api api/projects/{project}/cancel
 */
 async function cancelProject(req, res) {

  const id = req.params.id;

  Project.update(req.body, {
    where: { id: id, status: 'pending' }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Project was cancelled successfully."
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
 * Attach user to Project
 * 
 * @param {*} req 
 * @param {*} res 
 * 
 * @api api/projects/attach_user
 */
 async function attachUserToProject(req, res) {

        await check('name').notEmpty()
        .withMessage('Name is Required').run(req);

        const result = validationResult(req);

        if (!result.isEmpty()) {
            return res.status(422).json({ 
            errors: result.array() 
            });
        }

      // Get user input   
      const user_id = req.body.userId;

      // Validate if user already exists
      let user = await User.findOne({ where: {
        id : user_id
      } });

      if (user) {
        return res.status(422).json({
          errors: [
            {
              name: user.id,
              msg: "User exists"
            },
          ],
        });
      } else{
        return res.status(400).json({ errors: [ { msg: "Unknow user" }]});
      }

      // Save Project in the datbase
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
  getCompletedProjects,
  getPendingProjects,
  getCancelledProjects,
  updateProject,
  completeProject,
  cancelProject,
  attachUserToProject,
  deleteProject
}