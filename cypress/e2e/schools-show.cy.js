const showSchoolName = () => cy.getBySel('showSchoolName').last()
const showSchoolCourses = () => cy.getBySel('showSchoolCourses').last()

describe('schools show page', () => {
  beforeEach(() => {
    cy.visit('/schools/712')
  })

  it('shows the schools name', () => {
    showSchoolName().should('contain.text', 'EDISON HIGH SCHOOL')
    cy.screenshot({ capture: 'viewport' })
  })

  it('shows a list of courses including DRAMA', () => {
    showSchoolCourses().should('contain.text', 'DRAMA I')
  })

  it('shows a list of courses including JOB TRAINING', () => {
    showSchoolCourses().should('contain.text', 'JOB TRAINING')
  })
})
