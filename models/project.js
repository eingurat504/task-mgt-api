'use strict'
const { Model } = require('sequelize');
const db = require("../models");
const User = db.users;
const Task = db.tasks;

module.exports = function(sequelize, Sequelize){

    class Project extends Model{
        static associate({User,Task}) {
            this.belongsTo(User, {foreignKey: 'userId', as: 'users' })
            this.hasMany(Task, {foreignKey: 'projectId',  as: 'tasks' })
        }
        // static associate({Task}) {
        //     this.hasMany(Task, {foreignKey: 'projectId',  as: 'tasks' })
        // }
    };

    Project.init({
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },
        userId: {
            allowNull: false,
            type: Sequelize.INTEGER,
            references: User,
            referencesKey: 'id'
        },
        name: {
            type: Sequelize.STRING,
            noEmpty: true
        },
        status: {
            type:Sequelize.ENUM('completed','pending','cancelled'),
            defaultValue: 'pending'
        },
        description: {
            type: Sequelize.STRING,
            noEmpty:true
        }
    },{
        sequelize,
        tableName: 'api_projects',
        modelName: 'Project'
    });

    return Project;
};