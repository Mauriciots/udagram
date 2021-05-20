import { Sequelize } from 'sequelize-typescript';
import config from './config/config';
import models from './models';
import app from './app';

(function() {
  const envConfig = config.dev;
  const { username, password, databaseName: database, host } = envConfig.database;
  const sequelize = new Sequelize({
    username,
    password,
    database,
    host,
    dialect: 'postgres',
  });

  sequelize.addModels(models);
  sequelize.sync();

  sequelize
    .authenticate()
    .then(() => {
      console.log('Connection has been established successfully.');
      app.listen(envConfig.port, () => {
        console.log(`Example app listening at http://localhost:${envConfig.port}`);
      });
    })
    .catch((err) => {
      console.error('Unable to connect to the database:', err);
    });
})();