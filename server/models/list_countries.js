module.exports = (sequelize, DataTypes) => {
  const ListCountries = sequelize.define('list_countries', {
    name: DataTypes.STRING,
    short_name: DataTypes.STRING,
    phone_code: DataTypes.INTEGER
  }, {
    freezeTableName: true,//Create Table with Model Name
    timestamps: false,//Disable Timestamp - createdAt, updatedAt
    // tableName: 'list_countries'
  });
  return ListCountries;
}//End module export
