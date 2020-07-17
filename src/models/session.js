const { Model, Sequelize } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Session extends Model {
    static associate(models) {
      this.belongsTo(models.User, {
        foreignKey: 'userId',
        as: 'user',
        onDelete: 'CASCADE',
      });
    }
  }

  Session.init({
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: Sequelize.UUIDV4,
    },
    userId: DataTypes.UUID,
    deviceName: DataTypes.STRING,
    ipAddress: DataTypes.STRING,
    location: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Session',
  });

  return Session;
};
