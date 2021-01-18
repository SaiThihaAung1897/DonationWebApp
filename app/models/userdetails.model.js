module.exports = (sequelize, Sequelize) => {
    const userDetails = sequelize.define("userDetails", {
      autoId: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      userId: {
        type: Sequelize.STRING
      },
      name: {
        type: Sequelize.STRING
      },
      mail: {
        type: Sequelize.STRING
      },
      orgId: {
        type: Sequelize.STRING
      },
      orgName: {
        type: Sequelize.STRING
      }
    },{
      timestamps: false
    });
  
    return userDetails;
  };