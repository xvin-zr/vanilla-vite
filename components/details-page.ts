import { app } from '../app.js';
import { Product } from '../services/api.js';
import { getProductById } from '../services/menu';
import { addToCart } from '../services/order.js';
// @ts-ignore
import cssText from './DetailsPage.css?inline';

export default class DetailsPage extends HTMLElement {
    private root: ShadowRoot;
    private product: Product;
    constructor() {
        super();

        this.root = this.attachShadow({ mode: 'open' });

        const template = document.getElementById(
            'details-page-template'
        ) as HTMLTemplateElement;
        const content = template.content.cloneNode(true);
        const styles = document.createElement('style');
        this.root.appendChild(content);
        this.root.appendChild(styles);
        styles.textContent = cssText;
    }

    async renderData() {
        if (this.dataset.id) {
            this.product = await getProductById(Number(this.dataset.id));
            this.root.querySelector('h2')!.textContent = this.product.name;
            this.root.querySelector(
                'img'
            )!.src = `/data/images/${this.product.image}`;
            this.root.querySelector('.description')!.textContent =
                this.product.description;
            this.root.querySelector(
                '.price'
            )!.textContent = `$ ${this.product.price.toFixed(2)} ea`;
            this.root.querySelector('button')!.addEventListener('click', () => {
                addToCart(this.product.id);
                app.Router.go('/order');
            });
        } else {
            alert('Invalid Product ID');
        }
    }

    connectedCallback() {
        this.renderData();
        this.root
            .getElementById('back')
            ?.addEventListener('click', () => app.Router.go('/'));
    }
}

customElements.define('details-page', DetailsPage);
