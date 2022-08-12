import { defineConfig } from "cypress";

export default defineConfig({
  viewportHeight: 1000,
  viewportWidth: 1920,
  e2e: {
    baseUrl: 'http://localhost:4200',
    specPattern: 'cypress/e2e/**/*.{js,ts}',
    excludeSpecPattern: [
      '**/1-getting-started',
      '**/2-advanced-examples'
    ],
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
