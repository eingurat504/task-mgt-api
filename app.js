const client = require('./config/config.js');
const express = require('express');
const app = express();
const cors = require('cors');

const apiRouter = require('./routes/api');

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

app.listen(5000, function(){
    console.log('TASK MANAGEMENT API');
});

client.connect();

module.exports = app;
