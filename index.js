const server = require('./src/app.js');
const { conn } = require('./src/db.js');
const uploadData = require('./src/controllers/uploadData.js');

// Syncing all the models at once.

conn.sync({ force: false}).then(() => {


  server.listen(3001, () => {
//Creacion de datos de servicios mientras se finaliza el desarrollo
uploadData();
    console.log('Server is listening'); // eslint-disable-line no-console
  });
});

