const { Model } = require('sequelize');

module.exports = function(sequelize, Sequelize){
    
    class Task extends Model {
        static associate({Project}) {
            this.belongsTo(Project, {foreignKey: 'projectId', as: 'api_tasks' })
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