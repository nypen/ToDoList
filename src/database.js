const Sequelize = require('sequelize');
module.exports = new Sequelize('kabama_db1','kabama_1','KwnCnwDCz9grRH3g',{
  host: 'sql629.your-server.de',
  dialect: 'postgres',
  port: 5432,
  pool:{
    max:5,
    min:0,
    acquire:30000,
    idle:10000
  },
});
