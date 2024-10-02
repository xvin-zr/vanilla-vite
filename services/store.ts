import { CartItem, MenuItem } from './api';

const Store: {
    menu: MenuItem[] | null;
    cart: CartItem[];
} = {
    menu: null,
    cart: [],
};

export const MENU_CHANGE = 'appmenuchange';
export const CART_CHANGE = 'appcartchange';

const storeProxy = new Proxy(Store, {
    set(target, p, newVal) {
        target[p] = newVal;

        if (p === 'menu') {
            window.dispatchEvent(new Event(MENU_CHANGE));
        } else if (p === 'cart') {
            window.dispatchEvent(new Event(CART_CHANGE));
        }
        return true;
    },
});

export default storeProxy;
