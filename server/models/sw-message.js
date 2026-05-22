module.exports = (sequelize, DataTypes) => {
  const SWMessage = sequelize.define('sw_message', {
    sw_ref_id: DataTypes.INTEGER,
    sw_user_ref_id: DataTypes.INTEGER,
    pr_ref_id: DataTypes.INTEGER,
    pr_user_ref_id: DataTypes.INTEGER,
    pr_type: DataTypes.STRING,
    message: DataTypes.TEXT,
    type: DataTypes.STRING
    // seen: DataTypes.INTEGER,
  }, {
    freezeTableName: true,//Create Table with Model Name
    // tableName: 'user'
  });
  return SWMessage;
}//End module export
