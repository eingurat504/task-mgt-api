const express = require("express");
const router = express();

async function index(req, res) {  
    res.json({ message: 'WELCOME TO THE RECTS API'});
}

module.exports = {
  index
}