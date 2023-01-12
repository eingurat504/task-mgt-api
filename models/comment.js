const { Model } = require('sequelize');
const db = require("../models");
const Task = db.comments;
const User = db.users;


module.exports = function(sequelize, Sequelize){
    
    class Comment extends Model{
         static associate({Task}) {
             this.hasMany(Task, {foreignKey: [ 'taskId' ],  as: 'tasks' })
         }
         static associate({User}) {
            this.hasMany(User, {foreignKey: [ 'userId' ],  as: 'users' })
        }
    };
    
    Comment.init({
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },
        taskId: {
            type: Sequelize.INTEGER,
            noEmpty: true,
            references: Task,
            referencesKey: 'id'
        },
        status: {
            type:Sequelize.ENUM('active','inactive'),
            defaultValue: 'active'
        },
        comment: {
            type: Sequelize.STRING
        },
        userId: {
            type: Sequelize.INTEGER,
            noEmpty: true,
            references: User,
            referencesKey: 'id'
        },
    },{
        sequelize,
        tableName: 'api_comments',
        modelName: 'Comment'
    });

    return Comment;
}