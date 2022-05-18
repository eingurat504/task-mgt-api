const { Model } = require('sequelize');

module.exports = function(sequelize, Sequelize){

    class Project extends Model{

    };

    Project.init({
        id: {
            autoIncrement: true,
            primaryKey: true,
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