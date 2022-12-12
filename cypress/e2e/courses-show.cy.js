describe('courses show page', () => {
  beforeEach(() => {
    cy.visit('/courses/11215')
  })

  it('displays course information', () => {
    cy.get('body').last().should('contain.text', 'ADVANCED READING')
    cy.get('body').last().should('contain.text', 'Test Desc')
  })
})
