describe('Add todo', () => {
  it('User should add todo', () => {
    // Open app
    cy.visit('http://localhost:5173');

    // add text and click "Add"
    cy.get('[data-testid="todo-input"]')
      .type('Buy milk');

    cy.get('[data-testid="add-button"]')
      .click();

    // Check todo
    cy.contains('Buy milk')
      .should('be.visible');
  });
});