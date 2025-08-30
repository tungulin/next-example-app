import type { Knex } from 'knex';
import { loadEnvConfig } from '@next/env';
import path from 'path';

const projectDir = path.relative(process.cwd(), '../../');
loadEnvConfig(projectDir);

export default {
    client: 'postgresql',
    connection: {
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB_NAME,
    },
} as Knex.Config;
