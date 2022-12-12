describe('home page for the app', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('Describes what the app is used for', () => {
    cy.get('body').last().should('contain.text', 'individual course offerings')
  })
})

