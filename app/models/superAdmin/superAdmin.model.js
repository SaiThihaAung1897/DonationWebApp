module.exports = (sequelize, Sequelize) => {
    const superAdmin = sequelize.define("superAdmin", {
        autoId: {
            type: Sequelize.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: Sequelize.STRING,
        },
        email: {
            type: Sequelize.STRING
        }
    }, {
        timestamps: false
    });
    return superAdmin
}