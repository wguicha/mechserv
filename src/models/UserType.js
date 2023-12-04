const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('UserType', {
    uuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV1,
      primaryKey: true
    }, 
    typeUser: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false,
    }
    
    
  });
};