const bcrypt = require('bcrypt');
const { config } = require('dotenv');
const { Model, Sequelize } = require('sequelize');

config();

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      this.hasMany(models.Session, {
        foreignKey: 'userId',
        onDelete: 'CASCADE',
        as: 'sessions',
      });
    }
  }

  User.init({
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: Sequelize.UUIDV4,
    },
    fullName: DataTypes.STRING,
    username: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'User',
  });

  User.beforeCreate((user) => {
    user.password = user.generatePasswordHash();
  });

  User.toJSON = () => {
    const values = { ...this.get() };
    delete values.password;
    return values;
  };

  User.getExistingUser = async (queryString, column = 'email') => {
    const user = await User.findOne({ where: { [column]: queryString } });
    return user;
  };

  User.prototype.generatePasswordHash = function generatePasswordHash() {
    return bcrypt.hashSync(this.password, +process.env.SALT);
  };

  User.prototype.validatePassword = function validatePassword(password) {
    return bcrypt.compareSync(password, this.password);
  };

  return User;
};
