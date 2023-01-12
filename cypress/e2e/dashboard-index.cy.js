describe('dashboard index page', () => {
  beforeEach(() => {
    cy.visit('/dashboard')
  })

  it('renders a table of courses', () => {
    const dataTable = cy.getBySel('dataTable').last()
    dataTable.should('contain.text', 'ART')
    dataTable.should('contain.text', 'ADVANCED LANG ARTS')
    dataTable.should('contain.text', 'ADVANCED READING')
  })

  it('displays the instruction level for each course', () => {
    cy.getBySel('dataTable').last().should('contain.text', 'College Level')
  })
})
