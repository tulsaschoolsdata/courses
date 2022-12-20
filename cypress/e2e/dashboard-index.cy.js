describe('dashboard index page', () => {
  beforeEach(() => {
    cy.visit('/dashboard')
  })

  it('renders a table of courses', () => {
    cy.get('body').last().should('contain.text', 'ART')
    cy.get('body').last().should('contain.text', 'MUSIC')
    cy.get('body').last().should('contain.text', 'MATH')
  })

  it('displays the instruction level for each course', () => {
    cy.get('body').last().should('contain.text', 'College Level')
  })
})
