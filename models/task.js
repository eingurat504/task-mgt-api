const { Model } = require('sequelize');
const db = require("../models");
const Project = db.projects;

module.exports = function(sequelize, Sequelize){
    
    class Task extends Model {
        static associate({Project, User}) {
            this.belongsTo(Project, {foreignKey: 'projectId', as: 'projects' })
            this.belongsTo(User, {foreignKey: ['createdBy','assignedTo'], as: 'users' })
        }
    };
    
    Task.init({
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },
        projectId: {
            type: Sequelize.INTEGER,
            noEmpty: true,
            references: Project,
            referencesKey: 'id'
        },
        name: {
            type: Sequelize.STRING,
            noEmpty: true
        },
        status: {
            type:Sequelize.ENUM('completed','pending','accepted', 'cancelled', 'rejected','reviewed','deleted'),
            defaultValue: 'pending'
        },
        priority_level: {
            type:Sequelize.ENUM('Low','Medium', 'High','Critical'),
            defaultValue: 'Medium'
        },
        progress: {
            type:Sequelize.ENUM('Not Started','Started','Almost done', 'Done'),
            defaultValue: 'Not Started'
        },
        description: {
            type: Sequelize.TEXT,
            noEmpty:true
        },
        remarks: {
            type: Sequelize.TEXT,
            noEmpty:true
        },
        createdBy: {
            type:Sequelize.STRING,
            noEmpty:true
        },
        assignedTo: {
            type:Sequelize.INTEGER,
            noEmpty:true
        }
    },{
        sequelize,
        tableName: 'api_tasks',
        modelName: 'Task'
    });

    return Task;
}