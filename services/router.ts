const Router = {
    init: () => {
        document
            .querySelectorAll<HTMLAnchorElement>('a.navlink')
            .forEach((a) => {
                a.addEventListener('click', (e) => {
                    e.preventDefault();
                    const url = a.getAttribute('href')!;
                    Router.go(url);
                });
            });

        // Event Handler for URL change
        window.addEventListener('popstate', (e) => {
            Router.go(e.state?.route, false);
        });

        // Check initial URL
        Router.go(location.pathname);
    },
    go: (route: string, addToHistory = true) => {
        console.log(`Going to ${route}`);

        if (addToHistory) {
            history.pushState({ route }, '', route);
        }

        let pageElem: HTMLElement | undefined = undefined;
        switch (route) {
            case '/': {
                pageElem = document.createElement('menu-page');
                break;
            }
            case '/order': {
                pageElem = document.createElement('order-page');
                break;
            }
            default: {
                if (route.startsWith('/product-')) {
                    pageElem = document.createElement('details-page');
                    const [, paramId] = route.split('-');
                    pageElem.setAttribute('data-id', paramId);
                    break;
                }
            }
        }
        if (!pageElem) {
            return;
        }

        const mainElem = document.querySelector('main')!;
        mainElem.children?.[0]?.remove();
        mainElem.appendChild(pageElem);
        window.scrollX = 0;
        window.scrollY = 0;
    },
};

export default Router;
