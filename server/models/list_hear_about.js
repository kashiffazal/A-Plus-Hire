module.exports = (sequelize, DataTypes) => {
  const ListHearAbout = sequelize.define('list_hear_about', {
    name: DataTypes.STRING
  }, {
    freezeTableName: true,//Create Table with Model Name
    timestamps: false,//Disable Timestamp - createdAt, updatedAt
    // tableName: 'list_countries'
  });
  return ListHearAbout;
}//End module export
