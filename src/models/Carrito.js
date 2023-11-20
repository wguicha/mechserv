const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('Carrito', {
    id_carrito: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV1,
        primaryKey: true
      },
      uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV1,
        references: {
            model: 'User',
            key: 'uuid',
          }
      }, 
      date: {
        type: DataTypes.DATE,
        allowNull: false,
      },
    estatus: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    total: {
      type: DataTypes.DATE,
      allowNull: false,
    }
  });
};