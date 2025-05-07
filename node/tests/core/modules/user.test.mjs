import InternalModule from '#core/internal.mjs';
import UserModule from '#core/modules/user.mjs';

import '#tests/test-helper.mjs';

import assert from 'node:assert';
import test from 'node:test';

test('[UserModel] Initialize', () => {
    const core = new InternalModule();
    const userModel = new UserModule(core);

    assert(userModel);
});

test('[UserModel] create()', async () => {
    const core = new InternalModule();
    const userModel = new UserModule(core);

    const user = await userModel.create({ 
        name: 'aaaaa',
        email: 'martors@gmail.com',
        password: '123',
        role: 'user'
    });

    assert(user);
    assert(user.id);

    await userModel.del(user.id);
});

test('[UserModel] Login()', async () => {
    const core = new InternalModule();
    const userModel = new UserModule(core);

    const user = await userModel.create({ 
        name: 'aaaaa',
        email: 'martors@gmail.com',
        password: '123',
        role: 'user'
    });

    assert(user);
    assert(user.id);
 
    const userLoggedIn = await userModel.login('martors@gmail.com','123');

    assert(userLoggedIn.id === user.id);
    await userModel.del(user.id);
});