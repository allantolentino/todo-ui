import React from "react";
import { ITodo } from "../../models/ITodo";

interface ITodoContext {
    tasks: ITodo[];
    addTask?: (text: string) => void;
    deleteTask?: (id: number) => void;
    toggleCompleted?: (id: number) => void;
};

export const TodoContext = React.createContext<ITodoContext>({
    tasks: []
});