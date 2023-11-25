const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
 sequelize.define('Turno', {
    id_turno: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV1,
      primaryKey: true
    },
    dia: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    hora: {
      type: DataTypes.TIME,
      allowNull: false,
    },
    disponible: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
/*
    id_servicio: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: 'Servicio',
        key: 'id_servicio',
      },
    },
*/
  });
  }

