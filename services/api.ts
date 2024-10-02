import menu from '../data/menu.json';

export type MenuItem = (typeof menu)[number];
export type Product = MenuItem['products'][number];
export type CartItem = { product: Product; quantity: number };

const API = {
    url: '/data/menu.json',
    fetchMenu: async () => {
        return menu;
    },
};

export default API;
