module.exports = (sequelize, DataTypes) => {
  const ListIndustries = sequelize.define('list_industries', {
    name: DataTypes.STRING
  }, {
    freezeTableName: true,//Create Table with Model Name
    timestamps: false,//Disable Timestamp - createdAt, updatedAt
    // tableName: 'list_countries'
  });
  return ListIndustries;
}//End module export
