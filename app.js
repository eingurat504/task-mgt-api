const client = require('./config/config.js');
const express = require('express');
const app = express();

// const sequelize = require('sequelize');

const apiRouter = require('./routes/api');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Models
const models = require("./models");

app.use('/api', apiRouter);

//Sync database
models.sequelize.sync().then(function(){
    console.log('Nice database looks fine');
}).catch(function(err){
    console.log(err, 'something went wrong with the database update');
});

app.listen(5000, function(){
    console.log('Server is running successfully');
});

client.connect();

module.exports = app;