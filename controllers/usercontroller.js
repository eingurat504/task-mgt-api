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
 * Deactivate user
 * 
 * @param {*} req 
 * @param {*} res
 * 
 * @api api/users/{user} 
 */
async function deactivateUser(req, res) {

    const id = req.params.id;
  
    User.destroy({
      where: { id: id }
    })
      .then(num => {
        if (num == 1) {
          res.send({
            message: "user was deactivated successfully!"
          });
        } else {
          res.send({
            message: `Cannot deactivate user with id=${id}. Maybe user was not found!`
          });
        }
      })
      .catch(err => {
        res.status(500).send({
          message: "Could not deactivate User with id=" + id
        });
      });
  
  }
