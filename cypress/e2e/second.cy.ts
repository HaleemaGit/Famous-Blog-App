// // cypress/e2e/.cy.ts

// describe('Navigation', () => {
//   it('should navigate to a dynamic page', () => {
//     // Start from the index page
//     cy.visit('http://localhost:3000/')

//     // Find a link with an href attribute containing "about" and click it
//     cy.get('[id^=dynamic]').click()

//     // The new url should include "/sign-in"
//     cy.url().should('include', '/p/[id]')

//     // The new page should contain an h1 with "About page"
//     cy.get('p').contains('.author')
//   })
// })



describe("Login page", () => {
  before(() => {
    cy.log(`Visiting https://famousblog.com`)
    cy.visit("/sign-in")
  })
  it("Login with Google", () => {
    const username = Cypress.env("GOOGLE_USER")
    const password = Cypress.env("GOOGLE_PW")
    const loginUrl = Cypress.env("SITE_NAME")
    const cookieName = Cypress.env("COOKIE_NAME")
    const socialLoginOptions = {
      username,
      password,
      loginUrl,
      headless: true,
      logs: false,
      isPopup: true,
      loginSelector: `a[href="${Cypress.env(
        "SITE_NAME"
      )}/api/auth/signin/google"]`,
      postLoginSelector: ".unread-count",
    }

    return cy
      .task("GoogleSocialLogin", socialLoginOptions)
      .then(({ cookies }) => {
        cy.clearCookies()

        const cookie = cookies
          .filter((cookie) => cookie.name === cookieName)
          .pop()
        if (cookie) {
          cy.setCookie(cookie.name, cookie.value, {
            domain: cookie.domain,
            expiry: cookie.expires,
            httpOnly: cookie.httpOnly,
            path: cookie.path,
            secure: cookie.secure,
          })

          Cypress.Cookies.defaults({
            preserve: cookieName,
          })

          // remove the two lines below if you need to stay logged in
          // for your remaining tests
          cy.visit("/api/auth/signout")
          cy.get("form").submit()
        }
      })
  })
})