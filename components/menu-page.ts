export class MenuPage extends HTMLElement {
    private root: ShadowRoot;
    constructor() {
        super();
        this.root = this.attachShadow({ mode: 'open' });

        const styles = document.createElement('style');
        this.root.appendChild(styles);
        loadCSS();

        async function loadCSS() {
            const css = await fetch('/components/MenuPage.css').then((res) =>
                res.text()
            );
            styles.textContent = css;
        }
    }
    connectedCallback() {
        const template = document.getElementById(
            'menu-page-template'
        ) as HTMLTemplateElement;
        const content = template.content.cloneNode(true);
        this.root.appendChild(content);
    }
}

customElements.define('menu-page', MenuPage);
