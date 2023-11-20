const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('DetalleCarrito', {
    id_detalle: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV1,
      primaryKey: true
    },
    id_carrito: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV1,
        references: {
            model: 'Carrito',
            key: 'id_carrito',
          }
      },
      id_vehiculo: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV1,
        references: {
            model: 'Vehiculo',
            key: 'id_vehiculo',
          }
      },
      id_turno: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV1,
        references: {
            model: 'Turno',
            key: 'id_turno',
          }
      },
  
   
    subTotal: {
      type: DataTypes.DECIMAL(10, 2), 
      allowNull: false,
    }
  });
};