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

  describe('login', function () {
    it('succeeds with correct credentials', function () {
      cy.get('#username').type('Cypress');
      cy.get('#password').type('cypress-test');
      cy.get('#login-button').click();
      cy.contains('Logged in as Cypress User');
    });

    it('fails with incorrect credentials', function () {
      cy.get('#username').type('IncorrectUsername');
      cy.get('#password').type('cypress-test');
      cy.get('#login-button').click();
      cy.contains('Logged in as Cypress User').should('not.exist');
      cy.contains('Wrong credentials');
    });
  });

  describe('when logged in', function () {
    beforeEach(function () {
      cy.request('POST', 'http://localhost:3003/api/login', {
        username: 'Cypress',
        password: 'cypress-test',
      }).then((response) => {
        localStorage.setItem(
          'loggedInBlogsAppUser',
          JSON.stringify(response.body)
        );
        cy.visit('http://localhost:5173');
      });
    });

    it('a new blog can be created', function () {
      cy.contains('new blog').click();
      cy.get('#title').type('Test blog title');
      cy.get('#author').type('Cypress');
      cy.get('#url').type('https://example.com');
      cy.contains('button', 'Create').click();
      cy.contains('New blog: Test blog title by Cypress added');
      cy.contains('Test blog title Cypress');
    });

    describe('when there is a blog', function () {
      beforeEach(function () {
        cy.request({
          method: 'POST',
          url: 'http://localhost:3003/api/blogs',
          body: {
            title: 'Test blog 1',
            author: 'Cypress',
            url: 'http://example.com',
            likes: 1,
          },
          auth: {
            bearer: JSON.parse(localStorage.getItem('loggedInBlogsAppUser'))
              .token,
          },
        });
      });

      it('a blog can be liked', function () {
        cy.contains('view').click();
        cy.contains('likes 1');
        cy.contains('like').click();
        cy.contains('likes 2');
      });

      it('can be deleted by a valid user', function () {
        cy.contains('view').click();
        cy.contains('remove').click();
        cy.contains('blog: Test blog 1 removed');
        cy.contains('Test blog 1 Cypress').should('not.exist');
      });

      it('cannot be deleted by an invalid user', function () {
        cy.contains('Log Out').click();
        const user = {
          name: 'New User',
          username: 'newUser',
          password: 'cypress-test',
        };
        cy.request('POST', 'http://localhost:3003/api/users', user);
        cy.request('POST', 'http://localhost:3003/api/login', {
          username: 'newUser',
          password: 'cypress-test',
        }).then((response) => {
          localStorage.setItem(
            'loggedInBlogsAppUser',
            JSON.stringify(response.body)
          );
          cy.visit('http://localhost:5173');
        });
        cy.contains('view').click();
        cy.contains('remove').should('not.exist');
      });
    });
    describe('when there are multiple blogs', function () {
      beforeEach(function () {
        const requests = [
          {
            title: 'Test blog 1',
            author: 'Cypress',
            url: 'http://example.com',
            likes: 1,
          },
          {
            title: 'Test blog 2',
            author: 'Cypress',
            url: 'http://example.com',
            likes: 30,
          },
          {
            title: 'Test blog 3',
            author: 'Cypress',
            url: 'http://example.com',
            likes: 0,
          },
        ];
        for (let body of requests) {
          cy.request({
            method: 'POST',
            url: 'http://localhost:3003/api/blogs',
            body: body,
            auth: {
              bearer: JSON.parse(localStorage.getItem('loggedInBlogsAppUser'))
                .token,
            },
          });
        }
        cy.visit('http://localhost:5173');
      });

      it('blogs are ordered by the most likes descending', function () {
        cy.get('.blog').eq(0).contains('Test blog 2');
        cy.get('.blog').eq(1).contains('Test blog 1');
        cy.get('.blog').eq(2).contains('Test blog 3');
      });
    });
  });
});

