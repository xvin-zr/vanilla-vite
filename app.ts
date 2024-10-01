import { loadData } from './services/menu';
import Router from './services/router';
import Store from './services/store';

// Link Web Components
import './components/menu-page';
import './components/details-page';
import './components/order-page';

export const app = {
    Store,
    Router,
};

window.addEventListener('DOMContentLoaded', async function () {
    loadData();
    Router.init();
});
