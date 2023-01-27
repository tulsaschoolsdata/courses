const homePage = () => cy.get('body').last()

describe('home page for the app', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('Describes what the app is used for', () => {
    homePage().should('contain.text', 'individual course offerings')
    cy.screenshot({ capture: 'viewport' })
  })
})
