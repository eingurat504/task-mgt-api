const express = require("express");
const { check, validationResult } = require('express-validator');
const app = express();
const db = require("../models");
const Comment = db.comments;

/**
 * Get Comments
 * 
 * @param {*} req 
 * @param {*} res 
 * 
 * @api  api/comments
 */
async function getComments(req, res) { 
  Comment.findAll({includes: ['tasks', 'users']})
    .then(data => {
      res.send({'comments': data });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving comments."
      });
    });

}

/**
 * Get Comment details
 * 
 * @param {*} req 
 * @param {*} res
 * 
 * @api  api/comments/{comment}
 */
async function getComment(req, res) { 

  const id = req.params.id

  Comment.findByPk(id)
    .then(data => {
      if (data) {
        res.send({'comment' : data});
      } else {
        res.status(404).send({
          message: `Cannot find Comment with id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Comment with id=" + id
      });
    });
}

/**
 * Cancel Comment
 * 
 * @param {*} req 
 * @param {*} res 
 * 
 * @api api/comments/{comment}/cancel
 */
 async function cancelComment(req, res) {

  const id = req.params.id;

  Comment.update(req.body, {
    where: { id: id, status: 'pending' }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Comment was cancelled successfully."
        });
      } else {
        res.send({
          message: 'Cannot update Comment with id=${id}. Maybe Comment was not found or req.body is empty!'
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Comment with id=" + id
      });
    });

}

/**
 * Delete Comment
 * 
 * @param {*} req 
 * @param {*} res
 * 
 * @api api/comments/{comment} 
 */
async function deleteComment(req, res) {

  const id = req.params.id;

  Comment.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Comment was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Comment with id=${id}. Maybe Comment was not found!`
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
  getComments,
  getComment,
  cancelComment,
  deleteComment
}