'use strict'
const { Model } = require('sequelize');

module.exports = function(sequelize, Sequelize){

    class Project extends Model{
        static associate({User}) {
            // define association here
            this.belongsTo(User, {foreignKey: 'userId', as: 'api_users' })
        }
        static associate({Task}) {
            this.hasMany(Task, {foreignKey: 'projectId',  as: 'api_tasks' })
        }
    };

    Project.init({
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },
        userId: {
            allowNull: false,
            type: Sequelize.INTEGER
        },
        name: {
            type: Sequelize.STRING,
            noEmpty: true
        },
        status: {
            type:Sequelize.ENUM('completed','pending'),
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
}