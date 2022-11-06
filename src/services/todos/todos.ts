import type { IGetTodoListRq, ITodo, IUpdateTodoRq } from './types';

export const getTodoList = async ({ signal }: IGetTodoListRq) => {
  const response = await fetch('https://jsonplaceholder.typicode.com/todos', { signal });
  return (await response.json()) as ITodo[];
};

export const updateTodo = async ({ id, signal, ...todoData }: IUpdateTodoRq) => {
  const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(todoData),
    signal,
  });
  return (await response.json()) as ITodo;
};
