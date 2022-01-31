'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class white_list_token extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    // static associate(models) {
    //   // define association here
    // }
  }
  white_list_token.init({
    token: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'white_list_token',
    tableName: 'white_list_token'
  });
  return white_list_token;
};