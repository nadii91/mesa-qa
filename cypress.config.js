import { defineConfig } from 'cypress';

export default defineConfig({
  viewportWidth: 1280,
  viewportHeight: 900,
  video: false,
  e2e: {
    baseUrl: 'http://127.0.0.1:3001',
    supportFile: false,
    specPattern: 'cypress/e2e/*.cy.js',
  },
});
