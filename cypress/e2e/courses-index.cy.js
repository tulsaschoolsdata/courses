describe('courses index page', () => {
  beforeEach(() => {
    cy.visit('/courses')
  })

  it('renders a list of courses', () => {
    const allCourses = cy.getBySel('allCourses').last()
    allCourses.should('contain.text', 'ART')
    allCourses.should('contain.text', 'MUSIC')
    allCourses.should('contain.text', 'MATH')
  })

  it('displays course title', () => {
    cy.getBySel('allCourses')
      .last()
      .should('contain.text', 'DIGITAL ELECTRONICS')
  })

  it('displays course description', () => {
    cy.getBySel('allCourses').last().should('contain.text', 'Test Description')
  })
})
