import { http, HttpResponse } from 'msw';

interface TodoPatchInput {
  text?: string;
  completed?: boolean;
}

let todos = [
  { id: 1, text: 'Mocked Learn React', completed: false },
  { id: 2, text: 'Mocked Write tests', completed: false },
];

export const handlers = [
  http.get('https://api.example.com/todos', () => {
    return HttpResponse.json(todos);
  }),

  http.post('https://api.example.com/todos', async ({ request }) => {
    const body = await request.json() as { text: string };
    const newTodo = { id: Date.now(), text: body.text, completed: false };
    todos.push(newTodo);
    return HttpResponse.json(newTodo, { status: 201 });
  }),

  http.patch('https://api.example.com/todos/:id', async ({ params, request }) => {
    const id = Number(params.id);
    const body = await request.json() as TodoPatchInput;
  
    const index = todos.findIndex(t => t.id === id);
    if (index === -1) {
      return HttpResponse.text('Todo not found', { status: 404 });
    }
  
    todos[index] = { ...todos[index], ...body };
    return HttpResponse.json(todos[index]);
  }),

  http.delete('https://api.example.com/todos/:id', ({ params }) => {
    const id = Number(params.id);
    todos = todos.filter(todo => todo.id !== id);
    return new HttpResponse(null, { status: 204 });
  }),
];