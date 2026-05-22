const { Sequelize, DataTypes } = require('sequelize');
const dbCredentials = require('../credentials').db_credentials;

//@ Start Creating Connection ========================//
const sequelize = new Sequelize(
  dbCredentials.db_name,
  dbCredentials.user,
  dbCredentials.password,
  {
    host: dbCredentials.host,
    dialect: 'mysql',
    logging: false,//Avoid showing query in terminal 
    timezone: '+05:00', // for writing to database
    pool: {
      max: 100, // Maximum number of connection in pool
      min: 0, // Minimum number of connection in pool
      acquire: 30000, // Maximum time, in milliseconds, that pool will try to get connection before throwing error
      idle: 10000, // Maximum time, in milliseconds, that a connection can be idle before being released
    },
  });

try {
  sequelize.authenticate();
  console.log('Connection has been established successfully.');
} catch (error) {
  console.error('Unable to connect to the database:', error);
}//End condition
//@ End Creating Connection ==========================//

const db = {
  Sequelize: Sequelize,//@ Main
  sequelize: sequelize,//@ Constructor
}//End db Object

//@ Main Models
db.web_contact_form = require('./web-contact-form')(db.sequelize, DataTypes);
db.users = require('./users')(db.sequelize, DataTypes);
db.users_connects = require('./users_connects')(db.sequelize, DataTypes);
db.users_connects_total = require('./users_connects_total')(db.sequelize, DataTypes);
db.support_worker = require('./support-worker')(db.sequelize, DataTypes);
db.ndis_provider = require('./ndis-provider')(db.sequelize, DataTypes);
db.self_managed_participant = require('./self-managed-participant')(db.sequelize, DataTypes);
db.packages = require('./packages')(db.sequelize, DataTypes);
db.sw_message = require('./sw-message')(db.sequelize, DataTypes);
//@ List Models
db.list_countries = require('./list_countries')(db.sequelize, DataTypes);
db.list_states = require('./list_states')(db.sequelize, DataTypes);
db.list_hear_about = require('./list_hear_about')(db.sequelize, DataTypes);
db.list_languages = require('./list_languages')(db.sequelize, DataTypes);
db.list_industries = require('./list_industries')(db.sequelize, DataTypes);
db.list_dropdown = require('./list_dropdown')(db.sequelize, DataTypes);

// db.sequelize.sync();//Sync all tables at one time
db.sequelize.sync({ alter: true })// - This checks what is the current state of the table in the database (which columns it has, what are their data types, etc), and then performs the necessary changes in the table to make it match the model.

//@Associations relationships for connecting tables with foreign key
db.packages.belongsTo(db.users, { foreignKey: 'createdBy', as: 'createdByFromUser' });
db.packages.belongsTo(db.users, { foreignKey: 'updatedBy', as: 'updatedByFromUser' });

db.support_worker.belongsTo(db.users, { foreignKey: 'user_ref_id', as: 'userData' });
db.support_worker.belongsTo(db.list_languages, { foreignKey: 'main_language', as: 'mainLanguage' });
db.support_worker.belongsTo(db.list_dropdown, { foreignKey: 'work_status', as: 'wordStatusData' });
db.support_worker.belongsTo(db.list_dropdown, { foreignKey: 'availability', as: 'availabilityData' });
db.support_worker.belongsTo(db.list_dropdown, { foreignKey: 'years_of_experience', as: 'yearsOfExpData' });
db.support_worker.belongsTo(db.list_dropdown, { foreignKey: 'km_to_travel', as: 'kmToTravelData' });

db.self_managed_participant.belongsTo(db.users, { foreignKey: 'user_ref_id', as: 'userData' });
db.ndis_provider.belongsTo(db.users, { foreignKey: 'user_ref_id', as: 'userData' });

//@ allowNull is LEFT JOIN otherwise it will be consider INNER JOIN
db.users.belongsTo(db.list_states, { foreignKey: 'state', as: 'stateData', allowNull: true });
db.users.belongsTo(db.list_countries, { foreignKey: 'country_to_born', as: 'countryToBornData', allowNull: true });
db.users.belongsTo(db.list_hear_about, { foreignKey: 'hear_about_us', as: 'hearAboutUsData', allowNull: true });
db.users.belongsTo(db.packages, { foreignKey: 'package_ref_id', as: 'packageData', allowNull: true });

// db.users.belongsTo(db.sw_message, { foreignKey: 'id', targetKey: 'sw_user_ref_id', as: 'messageData', allowNull: true });
db.users.hasMany(db.sw_message, { foreignKey: 'sw_user_ref_id', sourceKey: 'id', as: 'messageData' });

db.users.belongsTo(db.support_worker, { foreignKey: 'sw_ref_id', as: 'swData', allowNull: true });
db.users.belongsTo(db.ndis_provider, { foreignKey: 'ndis_ref_id', as: 'ndisData', allowNull: true });
db.users.belongsTo(db.self_managed_participant, { foreignKey: 'sm_ref_id', as: 'smData', allowNull: true });

// db.sw_message.belongsTo(db.support_worker, { foreignKey: 'sw_ref_id', as: 'swData', allowNull: true });
db.sw_message.belongsTo(db.users, { foreignKey: 'pr_user_ref_id', as: 'prUserData', allowNull: true });
db.sw_message.belongsTo(db.users, { foreignKey: 'sw_user_ref_id', as: 'swUserData', allowNull: true });

module.exports = db;