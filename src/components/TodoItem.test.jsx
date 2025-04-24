import { render, screen, fireEvent } from '@testing-library/react';
import TodoItem from './TodoItem';

describe('TodoItem', () => {
  let mockTodo;
  let mockOnToggle;
  let mockOnDelete;

  const renderTodoItem = () => {
    render(
      <TodoItem 
        todo={mockTodo} 
        onToggle={mockOnToggle} 
        onDelete={mockOnDelete} 
      />
    );
  };

  beforeEach(() => {
    mockTodo = {
      id: 1,
      text: 'Test todo',
      completed: false,
    };

    mockOnToggle = jest.fn();
    mockOnDelete = jest.fn();
  });

  it('renders todo item with correct text and unchecked checkbox', () => {
    renderTodoItem();

    expect(screen.getByText(mockTodo.text)).toBeInTheDocument();
    expect(screen.getByRole('checkbox')).toBeInTheDocument();
    expect(screen.getByRole('checkbox')).not.toBeChecked();
  });

  it('calls onDelete with correct ID when delete button is clicked', () => {
    renderTodoItem();

    const deleteButton = screen.getByTestId(`delete-${mockTodo.id}`);
    fireEvent.click(deleteButton);

    expect(mockOnDelete).toHaveBeenCalledTimes(1);
    expect(mockOnDelete).toHaveBeenCalledWith(mockTodo.id);
  });

  it('calls onToggle with correct ID when checkbox is clicked', () => {
    renderTodoItem();

    const checkbox = screen.getByTestId(`toggle-${mockTodo.id}`);
    fireEvent.click(checkbox);

    expect(mockOnToggle).toHaveBeenCalledTimes(1);
    expect(mockOnToggle).toHaveBeenCalledWith(mockTodo.id);
  });
});