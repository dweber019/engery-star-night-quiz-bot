# Energy Star Night Quiz Bot

## Installation

[Download](https://www.cypress.io/) cypress and install.

Clone this repository and open the root of the cloned folder in cypress.

# ESN 2017
## Settings

### Number of tries
Open `cypress/integration/esn_spec.js` and change `let maxTrys = 100;` to the number you like to run the quiz.

### JWT Token
Open `cypress/integration/esn_spec.js` and change `cy.setCookie('jwt-token', '<token>')` and enter your token.
You can get your token by opening the Energy Star Night game and use the develop tools to get the token.

# ESN 2019
Start the bot by `yarn install` and `npm start`.  

Start the test `esn_19_spec.js`. Login but don't us a socal login as this doesn't work with cypress.  
After the login there is a `Game starten` button, if you see this button hit the play button in the cypress toolbar.

The test has to wait for 30 seconds after each try as ESN has implemented rate limiting.