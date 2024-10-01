import menu from '../data/menu.json';

export type MenuItem = (typeof menu)[number];

const API = {
    url: '/data/menu.json',
    fetchMenu: async () => {
        return menu;
    },
};

export default API;
