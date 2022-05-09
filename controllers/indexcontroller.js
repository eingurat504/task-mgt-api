const express = require("express");
const router = express();

async function index(req, res) {  
    res.json({ message: 'WELCOME TO THE TASK MGT API'});
}

module.exports = {
  index
}