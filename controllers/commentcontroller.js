const express = require("express");
const { check, validationResult } = require('express-validator');
const app = express();
const db = require("../models");
const Comment = db.comments;
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
 * Register a new Comment
 * 
 * @param {*} req 
 * @param {*} res
 * 
 * @api api/comments 
 */
 async function registerComment(req, res) {

  await check('comment').notEmpty()
  .withMessage('Comment is Required').run(req);

  const result = validationResult(req);

  if (!result.isEmpty()) {
      return res.status(422).json({ 
      errors: result.array() 
      });
  }

const data = {
  userId: req.body.userId,
  status: req.body.status,
  comment: req.body.comment,
  taskId: req.body.taskId,
};

// Save Comment in the database
Comment.create(data)
  .then(data => {
    res.status(201).send(data);
  })
  .catch(err => {
    res.status(500).send({
      message:
        err.message || "Some error occurred while creating the Comment."
    });
  });

}

/**
 * Update Comment
 * 
 * @param {*} req 
 * @param {*} res 
 * 
 * @api api/comments/{comment}
 */
 async function updateComment(req, res) {

  const id = req.params.id;

  Comment.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Comment was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Comment with id=${id}. Maybe Comment was not found or req.body is empty!`
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
        message: "Could not delete Comment with id=" + id
      });
    });

}

module.exports = {
  getComments,
  getComment,
  cancelComment,
  updateComment,
  registerComment,
  deleteComment
}