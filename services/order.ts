import { app } from '../app';
import { getProductById } from './menu';

export async function addToCart(id: number) {
    const product = await getProductById(id);
    const res = app.Store.cart.find((prod) => prod.product.id === id);
    if (res) {
        // product already in cart
        app.Store.cart = app.Store.cart.map((p) =>
            p.product.id === id ? { product, quantity: p.quantity + 1 } : p
        );
    } else {
        app.Store.cart = [...app.Store.cart, { product, quantity: 1 }];
    }
}

export function removeFromCart(id: number) {
    app.Store.cart = app.Store.cart.filter((p) => p.product.id !== id);
}