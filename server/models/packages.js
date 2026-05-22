module.exports = (sequelize, DataTypes) => {
  const Packages = sequelize.define('packages', {
    name: DataTypes.STRING,
    desc: DataTypes.STRING,
    connects: DataTypes.INTEGER,
    currency: DataTypes.STRING,
    regular_price: DataTypes.FLOAT,
    sale_price: DataTypes.FLOAT,
    // monthly_price: DataTypes.FLOAT,
    // monthly_sale_price: DataTypes.FLOAT,
    // yearly_price: DataTypes.FLOAT,
    // yearly_sale_price: DataTypes.FLOAT,
    list: DataTypes.JSON,
    list_icon: DataTypes.STRING,
    list_label: DataTypes.STRING,
    list_strike: DataTypes.STRING,
    is_free_plan: DataTypes.BOOLEAN,
    // is_trial: DataTypes.BOOLEAN,
    // trial_duration: DataTypes.INTEGER,
    is_default: DataTypes.BOOLEAN,
    status: DataTypes.STRING,
    createdBy: DataTypes.INTEGER,
    updatedBy: DataTypes.INTEGER
  }, {
    freezeTableName: true,//Create Table with Model Name
    // tableName: 'packages'
  });
  return Packages;
}//End module export
