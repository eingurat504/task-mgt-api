const { Model } = require('sequelize');

module.exports = function(sequelize, Sequelize){
    
    class Comment extends Model{
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