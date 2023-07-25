export interface Itodos{
  id: string,title: string; completed: boolean;
}
export type TodosContextState={
  todos: Itodos[];
  editTodoId: string;
  addTodo: (name: string) => void;
  removeTodo: (id: string) => void;
  markCompleted: (id: string) => void;
  editTodo: (id: string) => void;
  updateTodoFunc: (id?: string,title?: string, completed?: boolean) => void;
};

