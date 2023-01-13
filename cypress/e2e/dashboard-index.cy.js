const dataTable = () => cy.getBySel('dataTable').last()

describe('dashboard index page', () => {
  beforeEach(() => {
    cy.visit('/dashboard')
  })

  it('renders a table of courses', () => {
    dataTable().should('contain.text', 'ART')
    dataTable().should('contain.text', 'ADVANCED LANG ARTS')
    dataTable().should('contain.text', 'ADVANCED READING')
    cy.screenshot({ capture: 'viewport' })
  })

  it('displays the instruction level for each course', () => {
    dataTable().should('contain.text', 'College Level')
  })
})
