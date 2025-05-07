import { after } from 'node:test';
import Db from '#core/db.mjs';

after((async () =>{
    const db = new Db();
    await db.knex.destroy();
}));
