const Sequelize = require("sequelize");
const bcrypt = require("bcrypt");
const db = require("../src/database");

const User = db.define(
  "user",
  {
    username: {
      type: Sequelize.STRING
    },
    password: {
      type: Sequelize.STRING
    },
  },
  {
    timestamps: false,
    hooks: {
      beforeCreate: function(user){     //hook before create or update
        const salt = bcrypt.genSaltSync(10);
        user.password = bcrypt.hashSync(user.password, salt);
      },

    }
  }
);

User.prototype.validPassword = function validPassword(password) {
  return bcrypt.compareSync(password, this.password);
}

module.exports = User;
