import knexModule from 'knex';
import knexfile from './knexfile.mjs';

const knex = knexModule(knexfile);

class Db {
    constructor() {
        this.knex = knex;
    }
}

export default Db;