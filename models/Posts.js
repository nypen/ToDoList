const Sequelize = require('sequelize');
const db = require('../src/database');

const Post = db.define('post',{
  text:{
    type: Sequelize.STRING
  },
  post_date:{
    type: Sequelize.DATE
  },
  user_id:{
    type: Sequelize.INTEGER
  }

},{
  timestamps: false,
});

module.exports = Post;
