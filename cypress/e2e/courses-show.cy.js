describe('courses show page', () => {
  beforeEach(() => {
    cy.visit('/courses/30274')
  })

  it('displays course information', () => {
    cy.get('body').last().should('contain.text', 'DIGITAL ELECTRONICS')
  })

  it('displays schools where the course is offered', () => {
    cy.get('body').last().should('contain.text', 'EAST CENTRAL HIGH SCHOOL')
  })
})
