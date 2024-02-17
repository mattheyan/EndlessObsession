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
        syntaxHighlight: 'prism'
    }
});
