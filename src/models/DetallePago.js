const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('DetallePago', {
    id_detallePago: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV1,
        primaryKey: true
      },
      id_orden: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV1,
        references: {
            model: 'Orden',
            key: 'id_orden',
          }
      },
    
      date: {
        type: DataTypes.DATE,
        allowNull: false,
      },
    tipoPago: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    datosPago: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  });
};