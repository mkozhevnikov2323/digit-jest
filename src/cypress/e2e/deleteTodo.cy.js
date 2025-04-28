describe('Delete todo', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('Add and delete todo', () => {
    // 1. Add todo
    const taskText = 'Made homework';

    cy.get('input[placeholder="Add new todo..."]') 
      .type(taskText);

    cy.get('button').contains('Add').click();

    cy.contains(taskText).should('exist');

    // 2. Delete todo
    cy.contains(taskText)
      .parent()
      .find('button') 
      .contains('Delete')
      .click();

    // 3. Check
    cy.contains(taskText).should('not.exist');
  });
});