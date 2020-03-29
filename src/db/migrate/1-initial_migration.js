"use strict";

var Sequelize = require("sequelize");

/**
 * Actions summary:
 *
 * createTable "posts", deps: []
 * createTable "users", deps: []
 *
 **/

var info = {
  revision: 1,
  name: "initial_migration",
  created: "2020-03-26T08:53:50.577Z",
  comment: ""
};

var migrationCommands = [
  {
    fn: "createTable",
    params: [
      "posts",
      {
        id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          primaryKey: true,
          autoIncrement: true
        },
        text: {
          type: Sequelize.STRING,
          allowNull: false
        },
        post_date: {
          type: Sequelize.DATEONLY,
          allowNull: false
        },
        user_id: {
          type: Sequelize.INTEGER,
          allowNull: false
        },
        order: {
          type: Sequelize.INTEGER,
          allowNull: false
        }
      },
      {}
    ]
  },
  {
    fn: "createTable",
    params: [
      "users",
      {
        id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          primaryKey: true,
          autoIncrement: true
        },
        username: {
          type: Sequelize.STRING,
          allowNull: false
        },
        password: {
          type: Sequelize.STRING,
          allowNull: false
        }
      },
      {}
    ]
  }
];

module.exports = {
  pos: 0,
  up: function(queryInterface, Sequelize) {
    var index = this.pos;
    return new Promise(function(resolve, reject) {
      function next() {
        if (index < migrationCommands.length) {
          let command = migrationCommands[index];
          console.log("[#" + index + "] execute: " + command.fn);
          index++;
          queryInterface[command.fn]
            .apply(queryInterface, command.params)
            .then(next, reject);
        } else resolve();
      }
      next();
    });
  },
  info: info
};
