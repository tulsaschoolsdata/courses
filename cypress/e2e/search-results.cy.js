const searchResults = () => cy.getBySel('searchResults').last()
const recordCount = () => cy.getBySel('recordCount').last()

describe('search results', () => {
  it('accepts search as a query param', () => {
    cy.visit('/search/results?search=elec')
    searchResults().should('contain.text', 'DIGITAL ELECTRONICS')
    cy.screenshot({ capture: 'viewport' })
  })

  it('accepts creditType as a query param', () => {
    cy.visit('/search/results?creditType=FA')
    searchResults().should('contain.text', 'CHORUS')
  })

  it('accepts courseNumbers as a query param', () => {
    cy.visit('/search/results?courseNumbers=30444&courseNumbers=30274')
    searchResults().should('contain.text', 'CAREER EXP')
    searchResults().should('contain.text', 'DIGITAL')
  })

  it('accepts a single school as a query param', () => {
    cy.visit('/search/results?schools=710')
    searchResults().should('contain.text', 'CONCEPTS OF MUSIC')
    recordCount().should('contain.text', '10')
  })

  it('accepts an array of schools as a query param', () => {
    cy.visit('/search/results?schools=710&schools=712')
    recordCount().should('contain.text', '18')
  })
})
