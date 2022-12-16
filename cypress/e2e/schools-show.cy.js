describe('schools show page', () => {
  beforeEach(() => {
    cy.visit('/schools/712')
  })

  it('shows the schools name', () => {
    cy.get('body').last().should('contain.text', 'EDISON HIGH SCHOOL')
  })

  it('shows a list of courses including DRAMA', () => {
    cy.get('body').last().should('contain.text', 'DRAMA I')
  })

  it('shows a list of courses including JOB TRAINING', () => {
    cy.get('body').last().should('contain.text', 'JOB TRAINING')
  })
})
