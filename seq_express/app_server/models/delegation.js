'use strict';
module.exports = (sequelize, DataTypes) => {
  const Delegation = sequelize.define('Delegation', {
    EOA: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true
    },
    value: {
      type: DataTypes.STRING,
      allowNull: false
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false
    },
  });
  Delegation.associate = function(models) {
    // associations can be defined here
  };
  return Delegation;
};