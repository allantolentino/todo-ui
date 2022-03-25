import { useContext, useState } from "react";
import { TodoContext } from "../context/todo/todoContext";
import { ITodo } from "../models/ITodo";

export const useTodo = () => {
    return useContext(TodoContext);
}