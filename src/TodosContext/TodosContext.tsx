import { createContext, useState, useEffect, FC, ReactNode } from "react";
import { TodosContextState, Itodos } from "./types";

const contextDefaultValues: TodosContextState = {
  todos: [],
  editTodoId: "",
  addTodo: () => {},
  removeTodo: () => {},
  markCompleted: () => {},
  editTodo: () => {},
  updateTodoFunc: () => {},
};

export const TodosContext = createContext<TodosContextState>(
  contextDefaultValues
);
interface IProp {
  children: ReactNode;
}

const TodosProvider: FC<IProp> = ({ children }) => {
  const [todos, setTodos] = useState<Itodos[]>(contextDefaultValues?.todos);
  const [editTodoId, setEditTodoId] = useState<string>("");
  const addTodo = (title: string) => {
    setTodos((todos: Itodos[]) => [
      ...todos,
      { id: Math?.random()?.toString(), title, completed: false },
    ]);
  };
  const updateTodoFunc = (id, title, completed) => {
    const found = todos?.filter((el) => el?.id !== id);
    console.log("id, title, completed :", id, title, completed);
    let updatedTodos = [...found, { id, title, completed }];
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
    setTodos(updatedTodos);
  };
  const removeTodo = (id: string) => {
    console.log("Want delete : ", id);
    const updatedTodos = todos?.filter((el) => el?.id !== id);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
    setTodos(updatedTodos);
  };
  const markCompleted = (id: string) => {
    const updatedTodo = todos?.map((el) =>
      el?.id === id ? { ...el, completed: !el?.completed } : el
    );
    setTodos(updatedTodo);
  };
  const editTodo = (id: string) => {
    setEditTodoId(id);
  };

  useEffect(() => {
    // const todosLocal = JSON.parse(localStorage.getItem('todos') || '{}')
    if (todos?.length) {
      localStorage.setItem("todos", JSON.stringify(todos));
    }
    // else {
    //   console.log('remove')
    //   localStorage.removeItem('todos')
    // }
  }, [todos]);
  useEffect(() => {
    const todosLocal = JSON.parse(localStorage.getItem("todos") || "{}");

    if (!todos?.length && todosLocal?.length) {
      setTodos(todosLocal);
    }
  }, [todos]);

  return (
    <TodosContext.Provider
      value={{
        todos,
        editTodoId,
        addTodo,
        removeTodo,
        markCompleted,
        editTodo,
        updateTodoFunc,
      }}
    >
      {children}
    </TodosContext.Provider>
  );
};

export default TodosProvider;
