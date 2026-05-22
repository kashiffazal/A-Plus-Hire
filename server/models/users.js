module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define('users', {
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    date_of_birth: DataTypes.STRING,
    mobile_number: DataTypes.STRING,
    street_address: DataTypes.STRING,
    suburb: DataTypes.STRING,
    post_code: DataTypes.STRING,
    state: DataTypes.INTEGER,
    latitude: DataTypes.FLOAT,
    longitude: DataTypes.FLOAT,
    country_to_born: DataTypes.INTEGER,
    hear_about_us: DataTypes.INTEGER,
    email: DataTypes.STRING,
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    profile_image: DataTypes.STRING,
    company_logo: DataTypes.STRING,
    status: DataTypes.STRING,
    type: DataTypes.STRING,
    complete_by_type: DataTypes.BOOLEAN,
    sw_ref_id: DataTypes.INTEGER,
    sm_ref_id: DataTypes.INTEGER,
    ndis_ref_id: DataTypes.INTEGER,
    slug_color: DataTypes.STRING,
    email_code: DataTypes.STRING,
    email_verified: DataTypes.BOOLEAN,
    mobile_code: DataTypes.STRING,
    mobile_number_verified: DataTypes.BOOLEAN,
    forgot_pass_code: DataTypes.STRING,
    package_ref_id: DataTypes.INTEGER,
    package_free: DataTypes.BOOLEAN,
    payment_done: DataTypes.BOOLEAN
    // package_monthly: DataTypes.BOOLEAN,
    // package_trial: DataTypes.INTEGER,
    // package_initial_connects: DataTypes.INTEGER,
    // package_price: DataTypes.INTEGER
  }, {
    freezeTableName: true,//Create Table with Model Name
    // tableName: 'user'
  });
  return Users;
}//End module export
