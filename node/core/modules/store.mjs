import BaseModule from './base.mjs';

class StoreModule extends BaseModule {  
        async create(storeData) {
            this.validate({
                name: 'string',
                link: 'string'
            }, storeData);
    
            const storeResponse = await this.knex('stores').insert({
                ...storeData
            }).returning('*');
    
            if (!storeResponse || !storeResponse.length) {
                throw new Error('Unknown error while inserting store');
            }
    
            return storeResponse[0];
        }

        async addUser(storeId, userId, role){
            this.validate({
                storeId: 'string',
                userId: 'string',
                role: 'string'
            }, { storeId, userId, role });
            
            await this.knex('user_in_store').insert({
                user_id: userId,
                storeId: storeId,
                role

            });

        }
    
        async del(storeId) {
    
            this.validate({ id: 'string' }, { id: storeId });
            await this.knex('user_in_store').where({
                storeId: storeId
            }).del();
           await this.knex('stores').where({ id: storeId}).del();
        }

 }

export default StoreModule;