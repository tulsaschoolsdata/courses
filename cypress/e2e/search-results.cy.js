describe('search results page', () => {
  beforeEach(() => {
    cy.visit('/search/results?search=elec')
  })

  it('shows the schools name', () => {
    cy.get('body').last().should('contain.text', 'DIGITAL ELECTRONICS')
  })
})
