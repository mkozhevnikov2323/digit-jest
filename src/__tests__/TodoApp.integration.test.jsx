import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import App from '../App';
import '@testing-library/jest-dom';

describe('Todo App Integration', () => {
  test('loads and displays tasks when mounted', async () => {
    render(<App />);

    const todoItem1 = await screen.findByTestId('todo-text-1');
    const todoItem2 = await screen.findByTestId('todo-text-2'); 

    expect(todoItem1).toBeInTheDocument();
    expect(todoItem1).toHaveTextContent('Mocked');
    expect(todoItem2).toHaveTextContent('Mocked');
  });

  test('adding a new task is reflected in the UI and sent to the API', async () => {
    render(<App />);
    const newText = 'Write integration tests';
  
    await screen.findByTestId('todo-text-1');
  
    const input = await screen.findByTestId('todo-input');
    const button = await screen.findByTestId('add-button');
  
    fireEvent.change(input, { target: { value: newText } });
    fireEvent.click(button);
  
    const newTodo = await screen.findByText(newText);
    expect(newTodo).toBeInTheDocument();
  });
});