const { Model } = require('sequelize');
const db = require("../models");
const Task = db.comments;


module.exports = function(sequelize, Sequelize){
    
    class Comment extends Model{
         static associate({Task}) {
             this.hasMany(Task, {foreignKey: [ 'taskId' ],  as: 'tasks' })
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
        comment: {
            type: Sequelize.STRING
        },
        status: {
            type:Sequelize.ENUM('active','inactive'),
            defaultValue: 'active'
        }
    },{
        sequelize,
        tableName: 'api_comments',
        modelName: 'Comment'
    });

    return Comment;
}