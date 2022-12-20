describe('courses index page', () => {
  beforeEach(() => {
    cy.visit('/courses')
  })

  it('renders a list of courses', () => {
    cy.get('body').last().should('contain.text', 'ART')
    cy.get('body').last().should('contain.text', 'MUSIC')
    cy.get('body').last().should('contain.text', 'MATH')
  })

  it('displays the instruction level for each card', () => {
    cy.get('body').last().should('contain.text', 'College Level')
  })
})
