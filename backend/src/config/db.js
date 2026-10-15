const { Sequelize } = require("sequelize");
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
  host: process.env.DB_HOST,
  dialect: "mysql",
  port: process.env.DB_PORT || 3306,
  logging: false,
  pool: { max: 5, min: 0, acquire: 10000 },
});
module.exports = async function initializeDatabase() {
  await sequelize.authenticate();
  console.log(JSON.stringify({event: "database_connected", host: process.env.DB_HOST}));
  return sequelize;
};
