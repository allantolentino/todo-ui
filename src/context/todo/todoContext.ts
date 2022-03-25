import React from "react";
import { ITodo } from "../../models/ITodo";

interface ITodoContext {
    tasks: ITodo[];
    success?: boolean;
    loading: boolean;
    errors: string[];
    getTasks?: () => Promise<void>;
    addTask?: (text: string) => Promise<void>;
    deleteTask?: (id: number) => Promise<void>;
    updateTask?: (id: number, text: string) => Promise<void>;
    toggleCompleted?: (id: number) => void;
};

export const TodoContext = React.createContext<ITodoContext>({
    tasks: [],
    success: false,
    loading: false,
    errors: []
});