# Energy Star Night Quiz Bot

## Installation

[Download](https://www.cypress.io/) cypress and install.

Clone this repository and open the root of the cloned folder in cypress.

## Settings

### Number of tries
Open `cypress/integration/esn_spec.js` and change `let maxTrys = 100;` to the number you like to run the quiz.

### JWT Token
Open `cypress/integration/esn_spec.js` and change `cy.setCookie('jwt-token', '<token>')` and enter your token.
You can get your token by opening the Energy Star Night game and use the develop tools to get the token.

