module.exports = (sequelize, DataTypes) => {
  const ListCountries = sequelize.define('list_dropdown', {
    name: DataTypes.STRING,
    type: DataTypes.STRING,
    sequence: DataTypes.INTEGER
  }, {
    freezeTableName: true,//Create Table with Model Name
    timestamps: false,//Disable Timestamp - createdAt, updatedAt
    // tableName: 'list_countries'
  });
  return ListCountries;
}//End module export
