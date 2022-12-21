describe('courses index page', () => {
  beforeEach(() => {
    cy.visit('/courses')
  })

  it('renders a list of courses', () => {
    cy.get('body').last().should('contain.text', 'ART')
    cy.get('body').last().should('contain.text', 'MUSIC')
    cy.get('body').last().should('contain.text', 'MATH')
  })

  it('displays the instruction level for each card', () => {
    cy.get('body').last().should('contain.text', 'College Level')
  })

  it('displays course title', () => {
    cy.get('body').last().should('contain.text', 'DIGITAL ELECTRONICS')
  })

  it('displays department', () => {
    cy.get('body').last().should('contain.text', 'FA:Visual')
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
})
