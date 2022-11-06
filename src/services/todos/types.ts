export interface ITodo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

export interface IGetTodoListRq {
  signal?: AbortSignal;
}

export interface IUpdateTodoRq extends Pick<ITodo, 'id'>, Partial<Omit<ITodo, 'id'>> {
  signal?: AbortSignal;
}
