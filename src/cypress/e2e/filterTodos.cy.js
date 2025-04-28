describe('filter Todos', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('added todos and filtered by active and completed', () => {
    // Add task 1 (active)
    cy.get('[data-testid="todo-input"]').type('task 1');
    cy.get('[data-testid="add-button"]').click();

    // Add task 2 (this will showed as completed)
    cy.get('[data-testid="todo-input"]').type('task 2');
    cy.get('[data-testid="add-button"]').click();

    // Add task 3 (active)
    cy.get('[data-testid="todo-input"]').type('task 3');
    cy.get('[data-testid="add-button"]').click();

    // Clicked task 2 as completed
    cy.contains('[data-testid^="todo-text-"]', 'task 2')
      .closest('div')
      .find('input[type="checkbox"]')
      .click();

    // Check at "All" - showed all tasks
    cy.get('[data-testid="filter-all"]').click();
    cy.get('[data-testid="todo-list"]').should('contain.text', 'task 1');
    cy.get('[data-testid="todo-list"]').should('contain.text', 'task 2');
    cy.get('[data-testid="todo-list"]').should('contain.text', 'task 3');

    // Switch on filter "Active" - task 2 is not contained
    cy.get('[data-testid="filter-active"]').click();
    cy.get('[data-testid="todo-list"]').should('contain.text', 'task 1');
    cy.get('[data-testid="todo-list"]').should('contain.text', 'task 3');
    cy.get('[data-testid="todo-list"]').should('not.contain.text', 'task 2');

    // Switch on filter "Completed" - only contain Task 2
    cy.get('[data-testid="filter-completed"]').click();
    cy.get('[data-testid="todo-list"]').should('contain.text', 'task 2');
    cy.get('[data-testid="todo-list"]').should('not.contain.text', 'task 1');
    cy.get('[data-testid="todo-list"]').should('not.contain.text', 'task 3');
  });
});