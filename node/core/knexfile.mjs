import dirname from "#root/dirname.mjs";

import dotenv from 'dotenv';
import path from 'node:path';

dotenv.config({
    path: path.resolve(dirname, '.env')
});

const config = {
    client: 'pg',
    connection: {
        host: process.env.PSQL_HOST,
        database: process.env.PSQL_DATABASE,
        user: process.env.PSQL_USER,
        password: process.env.PSQL_PASSWORD
    },
    migrations: {
        directory: path.resolve(dirname, './migrations'),
        loadExtensions: ['.mjs']
    }
};

export default config;