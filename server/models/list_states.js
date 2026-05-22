module.exports = (sequelize, DataTypes) => {
  const ListStates = sequelize.define('list_states', {
    name: DataTypes.STRING,
    short_name: DataTypes.STRING
  }, {
    freezeTableName: true,//Create Table with Model Name
    timestamps: false,//Disable Timestamp - createdAt, updatedAt
    // tableName: 'list_countries'
  });
  return ListStates;
}//End module export
