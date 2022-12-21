describe('courses show page', () => {
  beforeEach(() => {
    cy.visit('/courses/30274')
  })

  it('displays course title', () => {
    cy.get('body').last().should('contain.text', 'DIGITAL ELECTRONICS')
  })

  it('displays course #', () => {
    cy.get('body').last().should('contain.text', 'Course #: 30274')
  })

  it('displays department', () => {
    cy.get('body').last().should('contain.text', 'CTE: STEM')
  })

  it('displays credit type', () => {
    cy.get('body').last().should('contain.text', 'Credit Type: ELEC')
  })

  it('displays credit hours', () => {
    cy.get('body').last().should('contain.text', 'Credit Hours: 1')
  })

  it('displays course description', () => {
    cy.get('body').last().should('contain.text', 'Test Description')
  })

  it('displays schools where the course is offered', () => {
    cy.get('body').last().should('contain.text', 'EAST CENTRAL HIGH SCHOOL')
  })
})
