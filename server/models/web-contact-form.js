module.exports = (sequelize, DataTypes) => {
  const ListStates = sequelize.define('web_contact_form', {
    name: DataTypes.STRING,
    phone: DataTypes.STRING,
    email: DataTypes.STRING,
    message_type: DataTypes.STRING,
    message: DataTypes.TEXT,
    status : DataTypes.STRING
  }, {
    freezeTableName: true,//Create Table with Model Name
    // tableName: 'list_countries'
  });
  return ListStates;
}//End module export
