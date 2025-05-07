import InternalModule from '#core/internal.mjs';
import StoreModule from '#core/modules/store.mjs';

import '#tests/test-helper.mjs';

import assert from 'node:assert';
import test from 'node:test';

test('[StoreModel] Initialize', () => {
    const core = new InternalModule();
    const storeModel = new StoreModule(core);

    assert(storeModel);
});

test('[StoreModel] create()', async () => {
    const core = new InternalModule();
    const storeModel = new StoreModule(core);

    const store = await storeModel.create({ 
        name: 'aaaaa',
        link: 'test'
    });

    assert(store);
    assert(store.id);

    await storeModel.del(store.id);
});