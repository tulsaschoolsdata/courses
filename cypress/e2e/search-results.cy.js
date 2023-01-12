describe('search results page', () => {
  beforeEach(() => {
    cy.visit('/search/results?search=elec')
  })

  it('finds matching courses for queries', () => {
    cy.getBySel('searchResults').last().should('contain.text', 'DIGITAL ELECTRONICS')
  })
})
