const { Model } = require('sequelize');
const db = require("../models");
const Project = db.projects;
const Task = db.tasks;


module.exports = function(sequelize, Sequelize){
    
    class User extends Model{
        static associate({Project, Task}) {
            this.hasMany(Project, {foreignKey: 'userId',  as: 'projects' })
            this.hasMany(Task, {foreignKey: [ 'createdBy','assignedTo' ],  as: 'tasks' })
        }
    }
    
    User.init({
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },
        firstname: {
            type: Sequelize.STRING,
            noEmpty: true
        },
        lastname: {
            type: Sequelize.STRING,
            noEmpty:true
        },
        role: {
            type: Sequelize.STRING,
            default: 'basic',
            enum: ["basic", "supervisor", "admin"]
        },
        username: {
            type: Sequelize.STRING
        },
        password: {
            type: Sequelize.STRING,
            noEmpty: true
        },
        about: {
            type: Sequelize.TEXT
        },
        email: {
            type: Sequelize.STRING,
            validate: {
                isEmail: true
            }
        },
        last_login: {
            type: Sequelize.DATE
        },
        status: {
            type:Sequelize.ENUM('active','inactive'),
            defaultValue: 'active'
        }
    },{
        sequelize,
        tableName: 'api_users',
        modelName: 'User'
    });

    return User;
}