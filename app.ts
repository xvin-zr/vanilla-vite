import { loadData } from './services/menu';
import Router from './services/router';
import Store from './services/store';

declare global {
    interface Window {
        app: {
            Store: typeof Store;
            Router: typeof Router;
        };
    }
}

export const app = {
    Store,
    Router,
};

window.addEventListener('DOMContentLoaded', async function () {
    loadData();
    Router.init();
});
