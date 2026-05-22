module.exports = (sequelize, DataTypes) => {
  const UsersConnects = sequelize.define('users_connects', {
    user_ref_id: DataTypes.INTEGER,
    package_ref_id: DataTypes.INTEGER,
    connects_in: DataTypes.INTEGER,
    connects_out: DataTypes.INTEGER,
    price: DataTypes.FLOAT
  }, {
    freezeTableName: true,//Create Table with Model Name
    // tableName: 'users_connects'
  });
  return UsersConnects;
}//End module export
