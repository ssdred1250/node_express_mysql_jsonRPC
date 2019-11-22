'use strict';
module.exports = (sequelize, DataTypes) => {
  const Stake = sequelize.define('Stake', {
    EOA: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true
    },
    value: {
      type: DataTypes.STRING,
      allowNull: false
    },
  });
  Stake.associate = function(models) {
    // associations can be defined here
  };
  return Stake;
};