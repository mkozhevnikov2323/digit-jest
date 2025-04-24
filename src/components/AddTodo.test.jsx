import { render, screen, fireEvent } from '@testing-library/react';
import AddTodo from './AddTodo';

describe('AddTodo', () => {
  let mockOnAdd;
  let input;
  let button;

  const setup = () => {
    mockOnAdd = jest.fn();
    render(<AddTodo onAdd={mockOnAdd} />);
    input = screen.getByTestId('todo-input');
    button = screen.getByTestId('add-button');
  };

  beforeEach(() => {
    setup();
  });

  it('calls onAdd with input value when form is submitted', () => {
    fireEvent.change(input, { target: { value: 'Learn Testing' } });
    fireEvent.click(button);

    expect(mockOnAdd).toHaveBeenCalledTimes(1);
    expect(mockOnAdd).toHaveBeenCalledWith('Learn Testing');
  });

  it('does not call onAdd when input is empty or whitespace', () => {
    fireEvent.change(input, { target: { value: '   ' } });
    fireEvent.click(button);

    expect(mockOnAdd).not.toHaveBeenCalled();
  });

  it('clears the input after successful submission', () => {
    fireEvent.change(input, { target: { value: 'Clean me' } });
    fireEvent.click(button);

    expect(input.value).toBe('');
  });
});
