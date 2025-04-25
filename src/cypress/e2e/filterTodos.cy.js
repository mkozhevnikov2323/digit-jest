describe('3.3. Фильтрация задач', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('добавляет задачи и фильтрует по активным и выполненным', () => {
    // Добавляем первую задачу (active)
    cy.get('[data-testid="todo-input"]').type('task 1');
    cy.get('[data-testid="add-button"]').click();

    // Добавляем вторую задачу (будем помечать как completed)
    cy.get('[data-testid="todo-input"]').type('task 2');
    cy.get('[data-testid="add-button"]').click();

    // Добавляем третью задачу (active)
    cy.get('[data-testid="todo-input"]').type('task 3');
    cy.get('[data-testid="add-button"]').click();

    // Помечаем вторую задачу как выполненную
    // Предположим ID присваивается по порядку: 0, 1, 2
    cy.get('[data-testid="toggle-1"]').click();

    // Проверяем, что в "All" фильтре видны все 3 задачи
    cy.get('[data-testid="filter-all"]').click();
    cy.get('[data-testid="todo-list"]').should('contain.text', 'task 1');
    cy.get('[data-testid="todo-list"]').should('contain.text', 'task 2');
    cy.get('[data-testid="todo-list"]').should('contain.text', 'task 3');

    // Переключаемся на фильтр "Только активные"
    cy.get('[data-testid="filter-active"]').click();
    cy.get('[data-testid="todo-list"]').should('contain.text', 'task 1');
    cy.get('[data-testid="todo-list"]').should('contain.text', 'task 3');
    cy.get('[data-testid="todo-list"]').should('not.contain.text', 'task 2');

    // Переключаемся на фильтр "Только выполненные"
    cy.get('[data-testid="filter-completed"]').click();
    cy.get('[data-testid="todo-list"]').should('contain.text', 'task 2');
    cy.get('[data-testid="todo-list"]').should('not.contain.text', 'task 1');
    cy.get('[data-testid="todo-list"]').should('not.contain.text', 'task 3');
  });
});