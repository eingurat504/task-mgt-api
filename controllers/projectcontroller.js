const express = require("express");
const app = express();
const db = require("../models");
const Project = db.projects;


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

module.exports = {
  getProjects
}