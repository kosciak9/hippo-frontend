// https://docs.cypress.io/api/introduction/api.html

describe('Login page when no Token in LocalStorage', () => {
  it('Visits the app root url', () => {
    cy.visit('/')
    cy.contains('button', 'Login')
  })
})
