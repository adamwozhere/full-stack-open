describe('bloglist app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset');
    const user = {
      name: 'Cypress User',
      username: 'Cypress',
      password: 'cypress-test',
    };
    cy.request('POST', 'http://localhost:3003/api/users', user);
    cy.visit('http://localhost:5173');
  });

  it('front page can be opened', function () {
    cy.contains('Blogs');
  });

  it('login form can be opened', function () {
    cy.contains('Log in');
    cy.get('#username').type('Cypress');
    cy.get('#password').type('cypress-test');
    cy.get('#login-button').click();
    cy.contains('Logged in as Cypress User');
  });

  describe('when logged in', function () {
    beforeEach(function () {
      cy.contains('Log in');
      cy.get('#username').type('Cypress');
      cy.get('#password').type('cypress-test');
      cy.get('#login-button').click();
    });

    it('a new blog can be created', function () {
      cy.contains('new blog').click();
      cy.get('#title').type('Test blog title');
      cy.get('#author').type('Cypress');
      cy.get('#url').type('https://example.com');
      cy.contains('button', 'Create').click();
      cy.contains('New blog: Test blog title by Cypress added');
    });
  });
});

