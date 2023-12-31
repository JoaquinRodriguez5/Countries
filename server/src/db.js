const path = require('path');
require("dotenv").config({path: path.resolve(__dirname, "server/api/.env")});
const { Sequelize } = require("sequelize");

const fs = require('fs');

const {
  DB_USER, DB_PASSWORD, DB_HOST,
} = process.env;
console.log(DB_HOST);
const sequelize = new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/countries`, {
  logging: false, 
  native: false, 
});

sequelize.authenticate()
  .then(() => {
    console.log('Conexión establecida');
  })
  .catch(error => {
    console.error('Error al conectar con la base de datos', error);
  });

const basename = path.basename(__filename);

const modelDefiners = [];

fs.readdirSync(path.join(__dirname, '/models'))
  .filter((file) => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, '/models', file)));
  });


modelDefiners.forEach(model => model(sequelize));

let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [entry[0][0].toUpperCase() + entry[0].slice(1), entry[1]]);
sequelize.models = Object.fromEntries(capsEntries);

const { Country, Activity } = sequelize.models;

Country.belongsToMany(Activity, { through: 'CountryActivity' });
Activity.belongsToMany(Country, { through: 'CountryActivity' });

Country.hasMany(Activity);
Activity.belongsTo(Country);

module.exports = {
  ...sequelize.models,
  conn: sequelize,
};