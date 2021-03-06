'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class payment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      payment.hasMany(models.payment_item, {
        sourceKey: 'id',
        foreignKey: 'payment_id',
        as: 'payment_item'
      })
    }
  }
  payment.init({
    user_id: DataTypes.INTEGER,
    tax: DataTypes.INTEGER,
    payment_methods: DataTypes.STRING,
    total_price: DataTypes.INTEGER,
    adress_detail: DataTypes.STRING,
    sub_total: DataTypes.INTEGER,
    shipping: DataTypes.INTEGER, 
    order_id: DataTypes.STRING,
    status_order: DataTypes.STRING,
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
    modelName: 'payment',
    tableName: 'payment'
  });
  return payment;
};