const searchForm = () => cy.getBySel('searchForm').last()

beforeEach(() => {
  cy.visit('/search')
})

describe('search form page', () => {
  it('has a form field for search term', () => {
    searchForm().should('contain.text', 'Course name or description')
  })

  it('has a form field for schools', () => {
    searchForm().should('contain.text', 'Select school(s)')
  })

  it('has a form field for credit type', () => {
    searchForm().should('contain.text', 'Select credit type')
  })

  it('has a form field for course numbers', () => {
    searchForm().should('contain.text', 'Course number(s)')
  })
})
