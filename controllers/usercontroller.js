const express = require("express");
const { check, validationResult } = require('express-validator');
const app = express();
const db = require("../models");
const User = db.users;

/**
 * Get Users
 * 
 * @param {*} req 
 * @param {*} res 
 * 
 * @api  api/users
 */
async function getUsers(req, res) { 

  User.findAll()
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
 * Get User details
 * 
 * @param {*} req 
 * @param {*} res
 * 
 * @api api/users/{user}
 */
 async function getUser(req, res) { 

    const id = req.params.id
  
    User.findByPk(id)
      .then(data => {
        if (data) {
          res.send({'user' : data});
        } else {
          res.status(404).send({
            message: `Cannot find user with id=${id}.`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Error retrieving user with id=" + id
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
 async function updateUserProfile(req, res) {

  const id = req.params.id;

  Task.update(req.body, {
    where: { id: id, status: 'active' }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "User profile was completed successfully."
        });
      } else {
        res.send({
          message: `Cannot update user profile with id=${id}. Maybe profile was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating profile with id=" + id
      });
    });

}



  /**
 * Deactivate user
 * 
 * @param {*} req 
 * @param {*} res
 * 
 * @api api/users/{user} 
 */
async function deactivateUser(req, res) {

    const id = req.params.id;
  
    User.update(req.body, {
        where: { id: id, status: 'active' }
      })
        .then(num => {
          if (num == 1) {
            res.send({
              message: "User was deactivated successfully."
            });
          } else {
            res.send({
              message: `Cannot dactivate user with id=${id}. Maybe user was not found or req.body is empty!`
            });
          }
        })
        .catch(err => {
          res.status(500).send({
            message: "Error deactivating user with id=" + id
          });
        });
  
  }


  module.exports = {
    getUsers,
    getUser,
    deactivateUser
  }
