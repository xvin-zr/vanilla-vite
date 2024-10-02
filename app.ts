import { loadData } from './services/menu';
import Router from './services/router';
import Store, { CART_CHANGE } from './services/store';

// Link Web Components
import './components/menu-page';
import './components/details-page';
import './components/order-page';
import './components/product-item';
import './components/cart-item';

export const app = {
    Store,
    Router,
};

window.addEventListener('DOMContentLoaded', async function () {
    loadData();
    Router.init();
});

window.addEventListener(CART_CHANGE, (e) => {
    const badge = document.getElementById('badge')!;
    const qty = app.Store.cart.reduce((acc, item) => acc + item.quantity, 0);
    badge.textContent = qty.toString();
    badge.hidden = qty === 0;
});
