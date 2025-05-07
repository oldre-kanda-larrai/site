import Db from '../db.mjs';
import z from 'zod';

class ValidationError extends Error { }

class ModuleBase {
    constructor() {
        this.db = new Db();
        this.knex = this.db.knex;
    } 

      validate(schemaLinkeObject, object ) {
        let errors;
        const zodSchema = {};
        
        for (const key in schemaLinkeObject) {
             zodSchema[key] = z[schemaLinkeObject[key]]();
        }

        try {
         const res = z.object(zodSchema).parse(object);
         errors = res.errors;

      } catch (ex) {
        errors = ex.errors;

      }
      if (!errors || !errors.length) { 
        return; 
    }
      throw new ValidationError(
        errors
        .map((r) => `Field: ${r.path.join('.')} - ${r.message}`)
        .join('\n')
    );
   }
}

export default ModuleBase;