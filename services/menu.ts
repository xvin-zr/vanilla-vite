import { app } from '../app';
import API from './api';

export async function loadData() {
    app.Store.menu = await API.fetchMenu();
}

export async function getProductById(id: number) {
    if (app.Store.menu === null) {
        await loadData();
    }

    for (const { products } of app.Store.menu!) {
        for (const product of products) {
            if (product.id === id) {
                return product;
            }
        }
    }
    throw new Error(`Product with id ${id} not found`);
}
