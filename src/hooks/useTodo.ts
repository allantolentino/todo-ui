import { useState } from "react";
import { ITodo } from "../models/ITodo";

export const useTodo = () => {
    const [tasks, setTasks] = useState<ITodo[]>([]);

    const addTask = (text: string) => {
        const ids = tasks.map(i => i.id);
        const maxId = ids.length ? Math.max(...ids) : 0;

        const newTask: ITodo = {
            id: maxId + 1,
            text: text,
            completed: false
        };

        setTasks([
            newTask,
            ...tasks
        ]);
    };

    const deleteTask = (id: number) => {
        const updatedTasks = tasks.filter(task => task.id !== id);

        setTasks([...updatedTasks]);
    };

    const toggleCompleted = (id: number) => {
        const updatedTasks = tasks.map(task => {
            if(task.id !== id) return task;

            return {
                ...task,
                completed: !task.completed
            };
        });

        setTasks([...updatedTasks]);
    };

    return {
        tasks,
        addTask,
        deleteTask,
        toggleCompleted
    };
}