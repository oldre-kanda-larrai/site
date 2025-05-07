import InternalModule from '#core/internal.mjs';

import assert from 'node:assert';
import test from 'node:test';

test('[InternalModules] Initialize', () => {
    const core = new InternalModule();
    assert(core);
    assert(core.user);
    assert(core.store);

});