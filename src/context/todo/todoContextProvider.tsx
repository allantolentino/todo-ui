import axios from "axios";
import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import { ITodo } from "../../models/ITodo";
import { TodoContext } from "./todoContext";

axios.defaults.baseURL = 'https://b6g1.azurewebsites.net';

const GET_URL: string = "/Items/";
const POST_URL: string = "/Items/";
const PUT_URL = (id: number): string => `/Items/${id}`;
const DELETE_URL = (id: number): string => `/Items/${id}`;

interface ITodoModel {
    id: number;
    text: string;
    completed: boolean;
    createdBy: string;
    dateCreated: Date;
}

export const TodoContextProvider: React.FC<{}> = (props) => {
    const { token } = useAuth();
    const [todos, setTodos] = useState<ITodo[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [errors, setErrors] = useState<string[]>([]);

    const handleError = (err: any) => {
        setErrors([err.message]);
    };

    const getTodos = async () => {
        try {
            setErrors([]);
            setLoading(true);

            const response = await axios.get<ITodoModel[]>(GET_URL,
                {
                    headers: {"Authorization": token}
                });

            const items: ITodo[] = response.data.map(d => {
                return {
                    id: d.id,
                    text: d.text,
                    completed: d.completed
                };});

            setTodos([...items]);
        } catch (err: any) {
            handleError(err);
        } finally {
            setLoading(false);
        }
    };

    const addTodo = async (text: string) => {
        try {
            setErrors([]);
            setLoading(true);

            await axios.post(POST_URL, { "text": text },
            {
                headers: { "Content-Type": "application/json", "Authorization": token }
            });

        } catch (err: any) {
            handleError(err);
        } finally {
            setLoading(false);
        }
    };

    const deleteTodo = async (id: number) => {
        try {
            setErrors([]);
            setLoading(true);

            await axios.delete(DELETE_URL(id),
            {
                headers: { "Content-Type": "application/json", "Authorization": token }
            });
        } catch (err: any) {
            handleError(err);
        } finally {
            setLoading(false);
        }
    };

    const updateTodo = async (id: number, 
                              text: string) => {
        try {
            setErrors([]);
            setLoading(true);

            await axios.put(PUT_URL(id), 
            {
                "text": text
            },
            {
                headers: { "Content-Type": "application/json", "Authorization": token }
            });
        } catch (err: any) {
            handleError(err);
        } finally {
            setLoading(false);
        }
    };

    return(
        <TodoContext.Provider
            value={{
                todos: todos,
                loading: loading,
                errors: errors,
                getTodos: getTodos,
                addTodo: addTodo,
                deleteTodo: deleteTodo,
                updateTodo: updateTodo
            }}>
                {props.children}
        </TodoContext.Provider>
    )
}