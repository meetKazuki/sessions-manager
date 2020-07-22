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
    deviceId: DataTypes.STRING,
    deviceName: DataTypes.STRING,
    ipAddress: DataTypes.STRING,
    location: DataTypes.STRING,
    isRevoked: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  }, {
    sequelize,
    modelName: 'Session',
    // paranoid: true,
    // deletedAt: 'isRevoked',
  });

  return Session;
};
