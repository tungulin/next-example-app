import Knex from 'knex';
import config from './knexfile';
import data from './data/movies.json';

const db = Knex(config);

db.batchInsert('movies', data as any).then(() =>
    console.log(
        '\x1b[33m Test data loaded! You can run the application! \x1b[0m',
    ),
);
