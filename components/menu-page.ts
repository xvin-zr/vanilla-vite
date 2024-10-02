import { app } from '../app';
import { MENU_CHANGE } from '../services/store';
// @ts-ignore
import cssText from './MenuPage.css?inline';

export default class MenuPage extends HTMLElement {
    private root: ShadowRoot;
    constructor() {
        super();
        this.root = this.attachShadow({ mode: 'open' });

        const styles = document.createElement('style');
        this.root.appendChild(styles);
        styles.textContent = cssText;
        // loadCSS();

        // async function loadCSS() {
        //     const css = await fetch('/components/MenuPage.css').then(
        //         (res) => res.text()
        //     );
        //     console.log(css);
        //     styles.textContent = css;
        // }
    }
    connectedCallback() {
        const template = document.getElementById(
            'menu-page-template'
        ) as HTMLTemplateElement;
        const content = template.content.cloneNode(true);
        this.root.appendChild(content);

        this.render();
        window.addEventListener(MENU_CHANGE, () => {
            this.render();
        });
    }
    render() {
        if (app.Store.menu) {
            this.root.querySelector('#menu')!.innerHTML = '';
            for (const { name, products } of app.Store.menu) {
                const liCategory = document.createElement('li');
                liCategory.innerHTML = `
                <h3>${name}</h3>
                <ul class="category">
                </ul>
                `;
                this.root.querySelector('#menu')?.appendChild(liCategory);

                products.forEach((product) => {
                    const item = document.createElement('product-item');
                    item.setAttribute('data-product', JSON.stringify(product));
                    liCategory.querySelector('ul')?.appendChild(item);
                });
            }
        } else {
            this.root.querySelector('#menu')!.innerHTML = 'Loading...';
        }
    }
}

customElements.define('menu-page', MenuPage);
