import User from './modules/user.mjs';
import Store from './modules/store.mjs';

class Core {
    constructor() {
        this.user = new User(this);
        this.store = new Store(this);
    }
}
export default Core;