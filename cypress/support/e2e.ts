// ***********************************************************
// This example support/e2e.ts is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
// import './commands'

// Alternatively you can use CommonJS syntax:
// require('./commands')

describe('Navigation', () => {
    it('should navigate to the about page', () => {
      // Start from the index page
      cy.visit('http://localhost:3000/')
  
      // Find a link with an href attribute containing "about" and click it
      cy.get('a[data-active*="signup"]').click()
  
      // The new url should include "/about"
      cy.url().should('include', '/sign-in')
  
      // The new page should contain an h1 with "About page"
      cy.get('h1').contains('Create an Account on the Spot or Just Sign In!')
    })
  })
  
  // Prevent TypeScript from reading file as legacy script
  export {}
  