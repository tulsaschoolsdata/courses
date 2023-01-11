describe('courses index page', () => {
  beforeEach(() => {
    cy.visit('/courses')
  })

  it('renders a list of courses', () => {
    cy.get('body').last().should('contain.text', 'ART')
    cy.get('body').last().should('contain.text', 'MUSIC')
    cy.get('body').last().should('contain.text', 'MATH')
  })

  it('displays course title', () => {
    cy.get('body').last().should('contain.text', 'DIGITAL ELECTRONICS')
  })

  it('displays course description', () => {
    cy.get('body').last().should('contain.text', 'Test Description')
  })
})
