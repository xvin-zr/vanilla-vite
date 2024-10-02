import { app } from '../app';
import { CART_CHANGE } from '../services/store';
// @ts-ignore
import cssText from './OrderPage.css?inline';

export default class OrderPage extends HTMLElement {
    private root: ShadowRoot;
    private user = {
        name: '',
        phone: '',
        email: '',
    };
    constructor() {
        super();

        this.root = this.attachShadow({ mode: 'open' });
        const styles = document.createElement('style');
        this.root.appendChild(styles);
        const section = document.createElement('section');
        this.root.appendChild(section);
        styles.textContent = cssText;
    }

    connectedCallback() {
        window.addEventListener(CART_CHANGE, () => {
            this.render();
        });
        this.render();
    }

    render() {
        let section = this.root.querySelector('section')!;
        if (app.Store.cart.length == 0) {
            section.innerHTML = `
            <p class="empty">Your order is empty</p>
        `;
        } else {
            let html = `
            <h2>Your Order</h2>
            <ul>
            </ul>
        `;
            section.innerHTML = html;

            const template = document.getElementById(
                'order-form-template'
            ) as HTMLTemplateElement;
            const content = template.content.cloneNode(true);
            section.appendChild(content);

            let total = 0;
            for (let prodInCart of app.Store.cart) {
                const item = document.createElement('cart-item');
                item.dataset.item = JSON.stringify(prodInCart);
                this.root.querySelector('ul')!.appendChild(item);

                total += prodInCart.quantity * prodInCart.product.price;
            }
            this.root.querySelector('ul')!.innerHTML += `
              <li>
                  <p class='total'>Total</p>
                  <p class='price-total'>$${total.toFixed(2)}</p>
              </li>                
          `;
        }

        this.setFormBindings(
            this.root.querySelector('form') as HTMLFormElement
        );
    }

    setFormBindings(form: HTMLFormElement) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            alert(`Thanks for your order ${this.user.name}!`);
            this.user.name = '';
            this.user.phone = '';
            this.user.email = '';
            // send data to server
        });

        // two way binding for data and form
        this.user = new Proxy(this.user, {
            set(target, prop, val) {
                target[prop] = val;
                form.elements[prop].value = val;
                return true;
            },
        });
        Array.from(form.elements).forEach((el) => {
            const elem = el as HTMLInputElement;
            elem.addEventListener('change', () => {
                this.user[elem.name] = elem.value;
            });
        });
    }
}

customElements.define('order-page', OrderPage);
