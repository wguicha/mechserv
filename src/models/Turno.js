const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('Turno', {
    id_turno: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV1,
      primaryKey: true
    },
    mañana: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    tarde: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    
  });
};