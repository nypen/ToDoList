/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define(
    "posts",
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
      },
      text: {
        type: DataTypes.STRING,
        allowNull: false
      },
      post_date: {
        type: DataTypes.DATEONLY,
        allowNull: false
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      order: {
        type: DataTypes.INTEGER,
        allowNull: false
      }
    },
    {
      tableName: "posts",
      timestamps: false
    }
  );
};
