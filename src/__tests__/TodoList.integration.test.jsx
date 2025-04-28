import { render, screen, fireEvent } from '@testing-library/react';
import TodoList from '../components/TodoList';

const mockTodos = [
  { id: 1, text: 'Buy milk', completed: false },
  { id: 2, text: 'Write tests', completed: true },
  { id: 3, text: 'Walk dog', completed: false }
];

let handleToggle;
let handleDelete;

const renderTodoList = (todos = mockTodos) => {
  render(<TodoList todos={todos} onToggle={handleToggle} onDelete={handleDelete} />);
};

describe('TodoList and TodoItem integration', () => {
  beforeEach(() => {
    handleToggle = jest.fn();
    handleDelete = jest.fn();
  });

  // 2.1
  it('renders list of todos correctly', () => {
    renderTodoList();

    expect(screen.getByTestId('todo-list')).toBeInTheDocument();

    mockTodos.forEach(todo => {
      const todoText = screen.getByTestId(`todo-text-${todo.id}`);
      const toggle = screen.getByTestId(`toggle-${todo.id}`);
      const deleteButton = screen.getByTestId(`delete-${todo.id}`);

      expect(todoText).toBeInTheDocument();
      expect(todoText.textContent).toBe(todo.text);

      expect(toggle).toBeInTheDocument();
      expect(toggle.checked).toBe(todo.completed);

      expect(deleteButton).toBeInTheDocument();
    });
  });

  it('renders empty list message when todos is empty', () => {
    renderTodoList([]);

    const emptyMessage = screen.getByTestId('empty-list');
    expect(emptyMessage).toBeInTheDocument();
    expect(emptyMessage.textContent).toBe('No todos found');
  });

  it('calls onToggle with correct id when checkbox is clicked', () => {
    renderTodoList();

    const checkbox = screen.getByTestId(`toggle-${mockTodos[0].id}`);
    fireEvent.click(checkbox);

    expect(handleToggle).toHaveBeenCalledTimes(1);
    expect(handleToggle).toHaveBeenCalledWith(mockTodos[0].id);
  });

  it('calls onDelete with correct id when delete button is clicked', () => {
    renderTodoList();

    const deleteButton = screen.getByTestId(`delete-${mockTodos[1].id}`);
    fireEvent.click(deleteButton);

    expect(handleDelete).toHaveBeenCalledTimes(1);
    expect(handleDelete).toHaveBeenCalledWith(mockTodos[1].id);
  });
});