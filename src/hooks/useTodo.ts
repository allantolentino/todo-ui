import { useContext, useEffect } from "react";
import { TodoContext } from "../context/todo/todoContext";

export const useTodo = () => {
    const todoContext = useContext(TodoContext);

    const addTodo = async (text: string) => {
        if(todoContext.addTodo) await todoContext.addTodo(text);
    }

    const updateTodo = async (id: number, text: string) => {
        if(todoContext.updateTodo) await todoContext.updateTodo(id, text);
    }

    const deleteTodo = async (id: number) => {
        if(todoContext.deleteTodo) await todoContext.deleteTodo(id);
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