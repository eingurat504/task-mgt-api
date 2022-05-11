module.exports = function(sequelize, Sequelize){
    var Task = sequelize.define('api_task', {
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
        description: {
            type: Sequelize.STRING,
            noEmpty:true
        },
        remarks: {
            type: Sequelize.STRING,
            noEmpty:true
        }
    });

    return Task;
}