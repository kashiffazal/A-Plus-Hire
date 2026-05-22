module.exports = (sequelize, DataTypes) => {
  const ListLanguages = sequelize.define('list_languages', {
    name: DataTypes.STRING,
    language_code: DataTypes.STRING,
  }, {
    freezeTableName: true,//Create Table with Model Name
    timestamps: false,//Disable Timestamp - createdAt, updatedAt
    // tableName: 'list_countries'
  });
  return ListLanguages;
}//End module export
