const { Model } = require('sequelize');

module.exports = function(sequelize, Sequelize){
    
    class Task extends Model {


    };
    
    Task.init({
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },
        project_id: {
            type: Sequelize.INTEGER,
            noEmpty: true
        },
        name: {
            type: Sequelize.STRING,
            noEmpty: true
        },
        status: {
            type:Sequelize.ENUM('completed','pending','accepted','rejected','reviewed','deleted'),
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
        created_by: {
            type:Sequelize.STRING,
            noEmpty:true
        },
        assigned_to: {
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