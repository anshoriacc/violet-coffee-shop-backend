'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class testimonies extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    // static associate(models) {
    //   // define association here
    // }
  }
  testimonies.init({
    user_id: DataTypes.INTEGER,
    star: DataTypes.DECIMAL,
    content: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'testimonies',
  });
  return testimonies;
};