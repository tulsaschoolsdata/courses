const allCourses = () => cy.getBySel('allCourses').last()

describe('courses index page', () => {
  beforeEach(() => {
    cy.visit('/courses')
  })

  it('renders a list of courses', () => {
    allCourses().should('contain.text', 'ART')
    allCourses().should('contain.text', 'MUSIC')
    allCourses().should('contain.text', 'MATH')
    cy.screenshot({ capture: 'viewport' })
  })

  it('displays course title', () => {
    allCourses().should('contain.text', 'DIGITAL ELECTRONICS')
  })

  it('displays course description', () => {
    allCourses().should('contain.text', 'Test Description')
  })
})
