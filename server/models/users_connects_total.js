module.exports = (sequelize, DataTypes) => {
  const UsersConnectsTotal = sequelize.define('users_connects_total', {
    user_ref_id: DataTypes.INTEGER,
    connects: DataTypes.INTEGER,
  }, {
    freezeTableName: true,//Create Table with Model Name
    // tableName: 'users_connects'
  });
  return UsersConnectsTotal;
}//End module export
