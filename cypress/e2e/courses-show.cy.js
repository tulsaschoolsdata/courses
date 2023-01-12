const showCourse = () => cy.getBySel('showCourse').last()

describe('courses show page', () => {
  beforeEach(() => {
    cy.visit('/courses/30274')
  })

  it('displays course title', () => {
    showCourse().should('contain.text', 'DIGITAL ELECTRONICS')
    cy.screenshot({ capture: 'viewport' })
  })

  it('displays course #', () => {
    showCourse().should('contain.text', 'Course #: 30274')
  })

  it('displays department', () => {
    showCourse().should('contain.text', 'CTE: STEM')
  })

  it('displays credit type', () => {
    showCourse().should('contain.text', 'Credit Type: ELEC')
  })

  it('displays credit hours', () => {
    showCourse().should('contain.text', 'Credit Hours: 1')
  })

  it('displays course description', () => {
    showCourse().should('contain.text', 'Test Description')
  })

  it('displays schools where the course is offered', () => {
    showCourse().should('contain.text', 'EAST CENTRAL HIGH SCHOOL')
  })

  it('displays a warning about pre requisites', () => {
    showCourse().should('contain.text', 'Prerequisite Note: Analog Electronics')
  })
})
