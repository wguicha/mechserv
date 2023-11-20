const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('Orden', {
    id_orden: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV1,
        primaryKey: true
      },
/*
      id_carrito: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV1,
        references: {
            model: 'Carrito',
            key: 'id_carrito',
          }
      },
*/      
      date: {
        type: DataTypes.DATE,
        allowNull: false,
      },
    
  });
};