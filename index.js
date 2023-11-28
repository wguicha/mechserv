const server = require('./src/app.js');
const { conn } = require('./src/db.js');
const uploadData = require('./src/controllers/uploadData.js');

// Syncing all the models at once.
<<<<<<< HEAD
conn.sync({ force: false}).then(() => {
=======
conn.sync({  }).then(() => {
>>>>>>> 364c0b43bbfd7768e3e65a26995914d4b7784a6c
  server.listen(3001, () => {
//Creacion de datos de servicios mientras se finaliza el desarrollo
uploadData();
    console.log('Server is listening'); // eslint-disable-line no-console
  });
});

