module.exports = (sequelize, DataTypes) => {
  const NDISProvider = sequelize.define('ndis_provider', {
    user_ref_id: DataTypes.INTEGER,
    company_name: DataTypes.STRING,
    about_your_company: DataTypes.TEXT,
    gender: DataTypes.STRING,
    self_describe_explain: DataTypes.TEXT,
    services_you_provide: DataTypes.STRING,
    status: DataTypes.STRING,
  }, {
    freezeTableName: true,//Create Table with Model Name
    // tableName: 'user'
  });
  return NDISProvider;
}//End module export
