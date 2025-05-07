import bcrypt from 'bcrypt';
import BaseModule from './base.mjs';

const SALT_ROUNDS = 10;

class UserModule extends BaseModule {
    async login(email, password) {
        this.validate({ 
            email: 'string', 
            password: 'string' 
        }, { email, password });

        const user = await this.knex('users').where({ email }).first();

        if (!user) {
            throw new Error(`User not found for email: ${email}`);
        }

        const isSamePass = await bcrypt.compare(password, user.password);

        if (!isSamePass) {
            throw new Error('Invalid password');
        }

        return user;
    }

    async create(userData) {
        this.validate({
            email: 'string',
            name: 'string',
            password: 'string'
        }, userData);

        const hashedPassword = await bcrypt.hash(
            userData.password, 
            SALT_ROUNDS
        );

        const userResponse = await this.knex('users').insert({
            ...userData,
            password: hashedPassword
        }).returning('*');

        if (!userResponse || !userResponse.length) {
            throw new Error('Unknown error while inserting user');
        }

        return userResponse[0];
    }

    async del(userId) {

        this.validate({ id: 'string' }, { id: userId });
       await this.knex('users').where({ id: userId}).del();
    }
}

export default UserModule;