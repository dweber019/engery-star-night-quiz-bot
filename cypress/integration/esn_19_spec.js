let answerJson = require('./../fixtures/esn-questions-2019.json');

const { _, $ } = Cypress
let maxTrys = 50;
let noMoreGames = false;

describe('Make quiz', function () {

  before(function () {
    Cypress.Cookies.defaults({
      whitelist: ['XSRF-TOKEN', '_ga', '_gid', 'energy_game_session', 'i00', 'id', 'DSID', '_gat', '_hjid', 'access_token']
    });
  });

  it('Open ESN', function () {
    cy.visit('https://game.energy.ch/');
    cy.title().should('include', 'Energy The Game');
    cy.pause();
    cy.get('button').contains('Game starten').click();
  });

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

  it('Select first', function () {
    const randomNumber = Math.floor(Math.random() * 12);
    cy.get('.circle:eq(' + randomNumber + ')').click();
  });

  it('Lose?', function () {
    cy.get('.container-fluid > h1').invoke('text').then((finalTitle) => {
      cy.log('Final Title: ' + finalTitle);
      if (finalTitle == 'Leider verloren') {
        if (!noMoreGames) {
          cy.wait(30000);
          cy.get('button').contains('Neustart').click();
        }
      } else {
        noMoreGames = true;
        Cypress.stop();
      }
    });
  });
}

function doQuiz(next) {

  return cy.get('.questions .question-text').invoke('text').then((questionTitle) => {
    cy.log('Question is: ' + questionTitle);

    let answer = getAnswer(questionTitle);

    cy.log('Answer is: ' + answer);

    // Mark the right Radio
    return cy.get('.questions .answers [type="radio"]').then(($radios) => {

      _.each($radios.get(), function (el, i) {
        cy.log('Antwort ' + i + ': ' + el.id + ' / ' + answer);

        if (el.id == answer) {
          cy.get('[id="' + el.id + '"]').check({force: true});
          cy.wait(150);
          cy.get('button').contains('Weiter').click();
        }
      });
    });

  });
}

function getAnswer(question) {
  let questionItem = answerJson.find(item => item.question.toLowerCase() === question.toLowerCase());
  return questionItem.answer;
}