require('dotenv').config();
const { Sequelize } = require('sequelize');
const fs = require('fs');
const path = require('path');
const {
  DB_USER, DB_PASSWORD, DB_HOST, DB_NAME, DB_URL_INT, DB_URL_EXT
} = process.env;

//Connect to local db:
//const sequelize = new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/dbmechserv`, {
//Internal connection inside Render.com:
//const sequelize = new Sequelize(`${DB_URL_INT}`, {
//External connection to Render.com db. Failed:
const sequelize = new Sequelize(`${DB_URL_EXT}`, {
  logging: false, // set to console.log to see the raw SQL queries
  native: false, // lets Sequelize know we can use pg-native for ~30% more speed
});

const basename = path.basename(__filename);

const modelDefiners = [];

// Leemos todos los archivos de la carpeta Models, los requerimos y agregamos al arreglo modelDefiners
fs.readdirSync(path.join(__dirname, '/models'))
  .filter((file) => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, '/models', file)));
  });

// Injectamos la conexion (sequelize) a todos los modelos
modelDefiners.forEach(model => model(sequelize));
// Capitalizamos los nombres de los modelos ie: product => Product
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [entry[0][0].toUpperCase() + entry[0].slice(1), entry[1]]);
sequelize.models = Object.fromEntries(capsEntries);

// En sequelize.models están todos los modelos importados como propiedades
// Para relacionarlos hacemos un destructuring
const { User, Carrito, DetalleCarrito, Vehiculo, Turno, DetallePago, Orden, Servicio } = sequelize.models;

// Aca vendrian las relaciones
User.hasOne(Carrito);
Carrito.belongsTo(User);

Carrito.hasMany(DetalleCarrito);
DetalleCarrito.belongsTo(Carrito);

User.hasMany(Vehiculo);
Vehiculo.belongsTo(User);

DetalleCarrito.hasOne(Vehiculo);
Vehiculo.belongsTo(DetalleCarrito);

DetalleCarrito.hasOne(Turno);
Turno.belongsTo(DetalleCarrito);

DetallePago.hasOne(Orden);
Orden.belongsTo(DetallePago);

Carrito.hasOne(Orden);
Orden.belongsTo(Carrito);

Servicio.hasOne(Turno);
Turno.belongsTo(Servicio);

//Videogame.belongsToMany(Genre, {through: 'game_genre'});
//Genre.belongsToMany(Videogame, {through: 'game_genre'});

// Product.hasMany(Reviews);

module.exports = {
  ...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
  conn: sequelize,     // para importart la conexión { conn } = require('./db.js');
};
