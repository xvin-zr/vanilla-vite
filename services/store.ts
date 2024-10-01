import { MenuItem } from './api';

const Store: {
    menu: MenuItem[] | null;
    // @ts-ignore
    cart: CartItem[];
} = {
    menu: null,
    cart: [],
};

export default Store;
