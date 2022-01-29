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
    static associate(models) {
      // define association here
      testimonies.hasOne(models.users,{
        sourceKey: "user_id",
        foreignKey: "id",
        as: "author"
      })
    }
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