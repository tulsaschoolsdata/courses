describe('schools show page', () => {
  beforeEach(() => {
    cy.visit('/schools/712')
  })

  it('shows the schools name', () => {
    cy.getBySel('showSchoolName').last().should('contain.text', 'EDISON HIGH SCHOOL')
  })

  it('shows a list of courses including DRAMA', () => {
    cy.getBySel('showSchoolCourses').last().should('contain.text', 'DRAMA I')
  })

  it('shows a list of courses including JOB TRAINING', () => {
    cy.getBySel('showSchoolCourses').last().should('contain.text', 'JOB TRAINING')
  })
})
