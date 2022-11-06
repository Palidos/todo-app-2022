import { useIsMutating, useMutation, useQueryClient } from '@tanstack/react-query';
import React, { useCallback } from 'react';

import { updateTodo } from 'services/todos';
import type { ITodo, IUpdateTodoRq } from 'services/todos/types';

import type { ITodoListItem } from './types';

export const TodoListItem: React.FC<ITodoListItem> = ({ id, title, completed }) => {
  const qc = useQueryClient();
  const isMutating = Boolean(useIsMutating(['todoList', id]));
  const { mutate } = useMutation<ITodo, Error, IUpdateTodoRq>({
    mutationKey: ['todoList', id],
    mutationFn: (todoData) => updateTodo(todoData),

    onMutate: (newTodoData) => {
      qc.setQueryData<ITodo[]>(['todoList'], (prevTodoListState) =>
        prevTodoListState?.map((todo: ITodo) => {
          if (todo.id === newTodoData.id) {
            return { ...todo, ...newTodoData };
          }
          return todo;
        })
      );
    },
    retry: 3,
  });

  const handleCompleteTodo = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (isMutating) {
      return;
    }

    mutate({ id, completed: e.target.checked });
  }, []);

  return (
    <li className="border-b border-b-gray-500 p-2">
      <label>
        <input
          className="mr-2"
          type="checkbox"
          defaultChecked={completed}
          name={String(id)}
          id={String(id)}
          onChange={handleCompleteTodo}
        />
        {title}
      </label>
    </li>
  );
};
