const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('Vehiculo', {
    id_vehiculo: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV1,
        primaryKey: true
      },
/*      
    uuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV1,
      references: {
        model: 'User',
        key: 'uuid',
      }
    },
*/
    marca: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    modelo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING, 
      allowNull: false,
    },
  });
};