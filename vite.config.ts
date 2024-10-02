import { defineConfig, PluginOption } from 'vite';

export default defineConfig({
    plugins: [inlineCSS()],
});

function inlineCSS(): PluginOption {
    return {
        name: 'vite-inline-css',
        apply: 'build',
        enforce: 'post',
        transformIndexHtml(html, context) {
            for (const file in context.bundle) {
                if (file.endsWith('.css')) {
                    // @ts-ignore
                    const { fileName, source } = context.bundle[file];

                    html = html.replace(
                        `<link rel="stylesheet" href="/${fileName}">`,
                        `<style>${source}</style>`
                    );
                }
            }

            return html;
        },
    };
}
