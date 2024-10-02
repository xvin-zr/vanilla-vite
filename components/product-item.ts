import { app } from '../app';
import { addToCart } from '../services/order';

export default class ProductItem extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        const template = document.getElementById(
            'product-item-template'
        ) as HTMLTemplateElement;
        const content = template.content.cloneNode(true);

        this.appendChild(content);

        const product = JSON.parse(this.dataset.product!);
        this.querySelector('h4')!.textContent = product.name;
        this.querySelector('p.price')!.textContent = `$${product.price.toFixed(
            2
        )}`;
        this.querySelector('img')!.src = `data/images/${product.image}`;
        this.querySelector('a')?.addEventListener('click', (event) => {
            const target = event.target as
                | HTMLAnchorElement
                | HTMLButtonElement;
            console.log(target.tagName);
            if (target.tagName.toLowerCase() == 'button') {
                addToCart(product.id)
            } else {
                app.Router.go(`/product-${product.id}`);
            }
            event.preventDefault();
        });
    }
}

customElements.define('product-item', ProductItem);
