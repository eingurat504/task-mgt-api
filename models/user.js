const { Model } = require('sequelize');

module.exports = function(sequelize, Sequelize){
    
    class User extends Model{

    };
    
    User.init({
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },
        firstname: {
            type: Sequelize.STRING,
            noEmpty: true
        },
        lastname: {
            type: Sequelize.STRING,
            noEmpty:true
        },
        username: {
            type: Sequelize.STRING
        },
        password: {
            type: Sequelize.STRING,
            noEmpty: true
        },
        about: {
            type: Sequelize.TEXT
        },
        email: {
            type: Sequelize.STRING,
            validate: {
                isEmail: true
            }
        },
        last_login: {
            type: Sequelize.DATE
        },
        status: {
            type:Sequelize.ENUM('active','inactive'),
            defaultValue: 'active'
        }
    },{
        sequelize,
        tableName: 'api_users',
        modelName: 'User'
    });

    return User;
}