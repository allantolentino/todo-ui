import { useContext, useEffect } from "react";
import { TodoContext } from "../context/todo/todoContext";

export const useTodo = () => {
    const todoContext = useContext(TodoContext);

    useEffect(() => {
        console.log(todoContext.errors);
    }, [todoContext.errors]);

    const addTodo = (text: string) => {
        if(todoContext.addTodo) todoContext.addTodo(text);
    }

    const updateTodo = (id: number, text: string) => {
        if(todoContext.updateTodo) todoContext.updateTodo(id, text);
    }

    const deleteTodo = (id: number) => {
        if(todoContext.deleteTodo) todoContext.deleteTodo(id);
    }

    return {
        errors: todoContext.errors,
        todos: todoContext.todos,
        loading: todoContext.loading,
        getTodos: todoContext.getTodos,
        addTodo,
        updateTodo,
        deleteTodo
    };
};