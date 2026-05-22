module.exports = (sequelize, DataTypes) => {
  const SelfManagedParticipant = sequelize.define('self_managed_participant', {
    user_ref_id: DataTypes.INTEGER,
    about_you: DataTypes.TEXT,
    gender: DataTypes.STRING,
    self_describe_explain: DataTypes.TEXT,
    services_you_need: DataTypes.STRING,
    status: DataTypes.STRING,
  }, {
    freezeTableName: true,//Create Table with Model Name
    // tableName: 'user'
  });
  return SelfManagedParticipant;
}//End module export
