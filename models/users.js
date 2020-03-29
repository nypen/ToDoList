/* jshint indent: 2 */

const bcrypt = require("bcrypt");

module.exports = (sequelize, DataTypes) => {
  const Model = sequelize.define(
    "users",
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false
      }
    },
    {
      tableName: "users",
      timestamps: false,
      hooks: {
        beforeCreate: function(user) {
          //hook before create or update
          const salt = bcrypt.genSaltSync(10);
          user.password = bcrypt.hashSync(user.password, salt);
        }
      }
    }
  );

  Model.prototype.validPassword = function validPassword(password) {
    return bcrypt.compareSync(password, this.password);
  };
  return Model;
};
