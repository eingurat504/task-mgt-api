'use strict'
const { Model } = require('sequelize');
const db = require(".");
const User = db.users;

module.exports = function(sequelize, Sequelize){

    class Attachment extends Model{
        static associate({User}) {
            this.belongsTo(User, {foreignKey: 'userId', as: 'users' })
        }
        static associate({Task}) {
            this.hasMany(Task, {foreignKey: 'AttachmentId',  as: 'tasks' })
        }
    };

    Attachment.init({
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },
        taskId: {
            allowNull: false,
            type: Sequelize.INTEGER,
            references: User,
            referencesKey: 'id'
        }
    },{
        sequelize,
        tableName: 'api_attachments',
        modelName: 'Attachment'
    });

    return Attachment;
};