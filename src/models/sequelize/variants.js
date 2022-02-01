'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class variants extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    // static associate(models) {
    //   // define association here
    // }
  }
  variants.init({
    product_id: DataTypes.INTEGER,
    variant: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'variants',
  });
  return variants;
};