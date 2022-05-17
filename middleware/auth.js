const express = require("express");
const app = express();
const jwt = require('jsonwebtoken')
const tokenSecret = process.env.ACCESS_TOKEN_SECRET;

const verifyToken = (req, res, next) => {
    const token = req.headers.authorization
    if (!token) res.status(403).json({error: "Access denied"})
    else {
        jwt.verify(token.split(" ")[1], tokenSecret, (err, value) => {
            if (err) res.status(500).json({error: 'Invalid token'})
            req.user = value.data
            next()
        })
    }
};

module.exports = verifyToken;
