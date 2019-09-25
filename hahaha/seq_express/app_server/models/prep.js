'use strict';
module.exports = (sequelize, DataTypes) => {
  const Prep = sequelize.define('Prep', {
    EOA: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false
    },
    website: {
      type: DataTypes.STRING,
      allowNull: false
    },
    country: {
      type: DataTypes.STRING,
      allowNull: false
    },
    city: {
      type: DataTypes.STRING,
      allowNull: false
    },
    details: {
      type: DataTypes.STRING,
      allowNull: false
    },
    p2pEndpoint: {
      type: DataTypes.STRING,
      allowNull: false
    },
  });
  Prep.associate = function(models) {
    // associations can be defined here
  };
  return Prep;
};