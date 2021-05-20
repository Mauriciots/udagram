import dotenv from 'dotenv';

dotenv.config();

const config = {
  dev: {
    port: process.env.PORT,
    database: {
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      databaseName: process.env.DB_NAME,
      host: process.env.DB_HOST,
    },
    storage: {
      region: process.env.STORAGE_REGION,
      profile: process.env.STORAGE_PROFILE,
      bucket: process.env.STORAGE_BUCKET,
    }
  }
};

export default config;