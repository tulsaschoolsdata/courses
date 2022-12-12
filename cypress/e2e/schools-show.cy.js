describe('schools show page', () => {
  beforeEach(() => {
    cy.visit('/schools/515')
  })

  it('shows the schools name', () => {
    cy.get('body').last().should('contain.text', 'CARVER')
  })

  it('shows a list of courses', () => {
    cy.get('body').last().should('contain.text', 'SPEECH')
  })
})
