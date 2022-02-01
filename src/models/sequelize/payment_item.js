'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class payment_item extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      payment_item.hasOne(models.products, {
        sourceKey: 'product_id',
        foreignKey: 'id',
        as: 'product'
      })
      payment_item.belongsTo(models.payment, {
        sourceKey: 'payment_id',
        foreignKey: 'id',
        as: 'payment'
      })
    }
  }
  payment_item.init({
    payment_id: DataTypes.INTEGER,
    product_id: DataTypes.INTEGER,
    quantity: DataTypes.INTEGER,
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
    modelName: 'payment_item',
  });
  return payment_item;
};