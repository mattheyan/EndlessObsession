import { defineConfig } from 'astro/config';

// https://astro.build/config
export default defineConfig({
    site: 'http://localhost:8888/',
    server: {
        port: 8888
    },
    build: {
        inlineStylesheets: 'never'
    },
    markdown: {
        // Use prism since it creates css classes that can be styled by my theme css
        // https://docs.astro.build/en/guides/markdown-content/#prism-configuration
        syntaxHighlight: 'prism'
    }
});
