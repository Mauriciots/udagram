import config from '../config/config';
import AWS = require('aws-sdk');

const envConfig = config.dev;

const DEFAULT_EXPIRATION = 60 * 5;

//Configure AWS
const credentials = new AWS.SharedIniFileCredentials({ profile: envConfig.storage.profile });
AWS.config.credentials = credentials;

const s3 = new AWS.S3({
  signatureVersion: 'v4',
  region: envConfig.storage.region,
  params: { Bucket: envConfig.storage.bucket }
});

export const getGetSignedUrl = ( key: string ): string => {
  return s3.getSignedUrl('getObject', {
    Bucket: envConfig.storage.bucket,
    Key: key,
    Expires: DEFAULT_EXPIRATION
  });
};

export const getPutSignedUrl = ( key: string ): string => {
  return s3.getSignedUrl('putObject', {
    Bucket: envConfig.storage.bucket,
    Key: key,
    Expires: DEFAULT_EXPIRATION
  });
};