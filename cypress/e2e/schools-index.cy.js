describe('schools index page', () => {
  beforeEach(() => {
    cy.visit('/schools')
  })

  it('renders a list of TPS schools', () => {
    cy.get('body').last().should('contain.text', 'CARVER')
    cy.get('body').last().should('contain.text', 'EAST CENTRAL')
    cy.get('body').last().should('contain.text', 'EDISON')
  })
})
