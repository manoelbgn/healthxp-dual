describe('home', () => {
  it('webapp deve estar online', () => {
    cy.visit('/')

    cy.title()
      .should('eq', 'Health eXperience | Exclusivo para treinamentos na QAx')
  })
})