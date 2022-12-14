import express from 'express';
import bp from 'body-parser';
import database from './database/model/Connection.js'

const PORT = 3000;

const startServer = async () => {
  console.log('SERVER STARTED');
  const app = express();
  app.use(bp.json());
  app.use(bp.urlencoded({ extended: false }));
  // app.use('/');

  listenPort(app);
};

const listenPort = (app) => {
  database
    .sync()
    .then((conn) => {
      app.listen(PORT);
    })
    .catch((err) => {
      console.log(err);
    });
};

startServer();
