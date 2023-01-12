const searchResults = () => cy.getBySel('searchResults').last()

describe('search results page', () => {
  beforeEach(() => {
    cy.visit('/search/results?search=elec')
  })

  it('finds matching courses for queries', () => {
    searchResults().should('contain.text', 'DIGITAL ELECTRONICS')
    cy.screenshot({ capture: 'viewport' })
  })
})
