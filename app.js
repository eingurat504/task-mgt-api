const client = require('./config/config.js');
const express = require('express');
const app = express();
const cors = require('cors');
const redis = require('redis');
const apiRouter = require('./routes/api');
const port = process.env.PORT || 5000

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const models = require("./models");

app.use(cors());

app.use('/api', apiRouter);

models.sequelize.sync().then(function(){
    console.log('Nice database looks fine');
}).catch(function(err){
    console.log(err, 'something went wrong with the database update');
});

app.listen(port, function(){
    console.log('TASK MANAGEMENT API');
});

client.connect();

module.exports = app;
