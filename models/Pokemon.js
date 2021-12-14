'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Pokemon extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Pokemon.init({
    name: DataTypes.STRING,
    type:DataTypes.STRING,
    health:DataTypes.INTEGER,
    attackOneTitle:DataTypes.STRING,
    attackOneCost:DataTypes.STRING,
    attackOneCost2:DataTypes.STRING,
    attackTwoTitle:DataTypes.STRING,
    attackTwoCost:DataTypes.STRING,
    attackTwoCost2:DataTypes.STRING,
    image: DataTypes.STRING,
    resistance: DataTypes.STRING,
    weakness: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Pokemon',
    tableName: 'pokemons',
    timestamps: false
  });
  return Pokemon;
};