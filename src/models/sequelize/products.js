'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class products extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    // static associate(models) {
    //   // define association here
    // }
  }
  products.init({
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    price: DataTypes.INTEGER,
    stock: DataTypes.STRING,
    start_delivery: DataTypes.STRING,
    end_delivery: DataTypes.STRING,
    image: DataTypes.STRING,
    size_1: {
      type:DataTypes.ENUM,
      values: ['R', '250gr'],
    },
    size_2: {
      type:DataTypes.ENUM,
      values: ['L', '300gr'],
    },
    size_3: {
      type:DataTypes.ENUM,
      values: ['XL', '500gr'],
    },
    home_delivery: DataTypes.INTEGER,
    dine_in: DataTypes.INTEGER,
    take_away: DataTypes.INTEGER,
    createdAt:{
      field: 'created_at',
      type: DataTypes.DATE
    },
    updatedAt:{
      field: 'updated_at',
      type: DataTypes.DATE
    }
  }, {
    sequelize,
    modelName: 'products',
  });
  return products;
};