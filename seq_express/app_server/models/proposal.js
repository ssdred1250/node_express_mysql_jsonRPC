'use strict';
module.exports = (sequelize, DataTypes) => {
  const Proposal = sequelize.define('Proposal', {
    id:{
      type: DataTypes.STRING,
      allowNull: false, 
      primaryKey: true
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    value: {
      type: DataTypes.STRING,
      allowNull: false
    },
    vote: {
      type: DataTypes.STRING,
      allowNull: true
    }
  });
  Proposal.associate = function(models) {
    // associations can be defined here
  };
  return Proposal;
};