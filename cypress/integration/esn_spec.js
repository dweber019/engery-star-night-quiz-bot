let answerJson = require('./../fixtures/esn-questions.json');

const { _, $ } = Cypress
let maxTrys = 100;
let noMoreGames = false;

describe('Make quiz', function () {

  before(function () {
    Cypress.Cookies.defaults({
      whitelist: ["jwt-token", 'XSRF-TOKEN', '_ga', '_gid', 'energy_game_session', 'i00', 'srp']
    })
    cy.setCookie('jwt-token', '')
  })

  it('Open ESN', function () {
    cy.visit('https://game.energy.ch/');
    cy.title().should('include', 'Energy Star Night - The Game');
  })

  for (let i = 0; i < maxTrys; i++) {
    doQuizContainer();
  }

});

function doQuizContainer() {

  it('Do the 1 questions', function () {
    return doQuiz(true);
  });

  it('Do the 2 questions', function () {
    return doQuiz(true);
  });

  it('Do the 3 questions', function () {
    return doQuiz(true);
  });

  it('Do the 4 questions', function () {
    return doQuiz(true);
  });

  it('Do the 5 questions', function () {
    return doQuiz(true);
  });

  it('Do the 6 questions', function () {
    return doQuiz(true);
  });

  it('Do the 7 questions', function () {
    return doQuiz(true);
  });

  it('Do the 8 questions', function () {
    return doQuiz(true);
  });

  it('Do the 9 questions', function () {
    return doQuiz(true);
  });

  it('Do the 10 questions', function () {
    return doQuiz(true);
  });

  it('Select Ticket', function () {
    cy.get('.ticket-slot').click();
  });

  it('Select first monkey', function () {
    const randomNumber = Math.floor(Math.random() * 12);
    cy.get('.circle:eq(' + randomNumber + ')').click();
  });

  it('Lose?', function () {
    cy.get('.esn-special-screen > h1').invoke('text').then((finalTitle) => {
      cy.log('Final Title: ' + finalTitle);
      if (finalTitle == 'Leider verloren') {
        if (!noMoreGames) {
          cy.get('.game-button').click();
        }
      } else {
        noMoreGames = true;
        Cypress.stop();
      }
    });
  });
}

function doQuiz(next) {

  return cy.get('.questions h3').invoke('text').then((questionTitle) => {
    cy.log('Question is: ' + questionTitle);

    let answer = getAnswer(questionTitle);

    cy.log('Answer is: ' + answer);

    // Mark the right Radio
    return cy.get('.questions .answers [type="radio"]').then(($radios) => {

      _.each($radios.get(), function (el, i) {
        cy.log('Antwort ' + i + ': ' + el.id + ' / ' + answer);

        if (questionTitle === 'Wie heisst dieser Superheld?') {
          if (answer.indexOf(el.id) >= 0) {
            cy.get('[id="' + el.id + '"]').check();
          }
        } else {
          if (el.id == answer) {
            cy.get('[id="' + el.id + '"]').check();
          }
        }
      });
    }).then(() => {
      if (next) {
        cy.log('Click next')
        cy.get('#next-question').click()
      }
    });

  });
}

function getAnswer(question) {
  let questionItem = answerJson.find(item => item.question === question);
  return questionItem.answer;
}