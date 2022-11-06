import { useQuery } from '@tanstack/react-query';

import { TodoListItem } from 'components/TodoListItem';
import { getTodoList } from 'services/todos';
import { ITodo } from 'services/todos/types';

export const Home: React.FC = () => {
  const {
    data: todoList,
    isLoading,
    isError,
    error,
  } = useQuery<ITodo[], Error>({
    queryKey: ['todoList'],
    queryFn: ({ signal }) => getTodoList({ signal }),
  });

  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  return (
    <main className="mx-auto w-8/12 py-6">
      {
        <ul>
          {todoList.map(({ id, title, completed, userId }) => (
            <TodoListItem key={id} id={id} title={title} completed={completed} userId={userId} />
          ))}
        </ul>
      }
    </main>
  );
};
