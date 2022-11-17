import { defineConfig } from "cypress";
const { GoogleSocialLogin } = require("cypress-social-logins").plugins;
const { GithubSocialLogin } = require("cypress-social-logins").plugins;


export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
      on('task', {
        GoogleSocialLogin: GoogleSocialLogin,
        GithubSocialLogin: GoogleSocialLogin
      })
    },
  },
});


// import { defineConfig } from 'cypress'

// export default defineConfig({
//   // setupNodeEvents can be defined in either
//   // the e2e or component configuration
//   e2e: {
//     setupNodeEvents(on, config) {
//       on('task', {
//         log(message) {
//           console.log(message)
      
//           return null
//         },
//       })
//     }
//   }
// })