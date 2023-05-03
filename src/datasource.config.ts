import 'dotenv/config';
import 'reflect-metadata';
import { DataSource, DataSourceOptions } from 'typeorm';
import { config } from 'dotenv';
import * as migrations from './database/migrations';
import * as entities from './database/entities';

config();

export interface GetDatabaseConfigOptions {
  migrationsRun?: boolean;
  cacheEnabled?: boolean;
  logging?: boolean;
}

export function getDatabaseConfig(): DataSourceOptions {
  return {
    type: process.env.TYPEORM_CONNECTION as any,
    host: process.env.TYPEORM_HOST,
    port: process.env.TYPEORM_PORT as any,
    username: process.env.TYPEORM_USERNAME,
    password: process.env.TYPEORM_PASSWORD,
    database: process.env.TYPEORM_DATABASE,
    logging: process.env.TYPEORM_LOGGING === 'true',
    synchronize: process.env.TYPEORM_SYNCHRONIZE === 'true',
    entities,
    migrations,
  } as DataSourceOptions;
}

export const databaseConfig = getDatabaseConfig();

export default new DataSource(databaseConfig);
