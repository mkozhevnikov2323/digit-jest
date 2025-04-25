import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:5173',
    specPattern: 'src/cypress/e2e/**/*.cy.{js,jsx,ts,tsx}',
    supportFile: 'src/cypress/support/e2e.js',
    setupNodeEvents(on, config) {
      return config
    },
  },
  video: false,
  screenshotOnRunFailure: true,
})