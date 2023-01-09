const { Model } = require('sequelize');

module.exports = function(sequelize, Sequelize){
    
    class Comment extends Model{
        static associate({Project}) {
            this.hasMany(Project, {foreignKey: 'userId',  as: 'projects' })
        }
        static associate({Task}) {
            this.hasMany(Task, {foreignKey: [ 'createdBy','assignedTo' ],  as: 'tasks' })
        }
    };
    
    Comment.init({
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
        status: {
            type:Sequelize.ENUM('active','inactive'),
            defaultValue: 'active'
        },
        remarks: {
            type: Sequelize.TEXT,
            noEmpty:true
        }
    },{
        sequelize,
        tableName: 'api_comments',
        modelName: 'Comment'
    });

    return Comment;
}