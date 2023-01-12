const allSchools = () => cy.getBySel('allSchools').last()

describe('schools index page', () => {
  beforeEach(() => {
    cy.visit('/schools')
  })

  it('renders a list of TPS schools', () => {
    allSchools().should('contain.text', 'CARVER')
    allSchools().should('contain.text', 'EAST CENTRAL')
    allSchools().should('contain.text', 'EDISON')
    cy.screenshot({ capture: 'viewport' })
  })
})
