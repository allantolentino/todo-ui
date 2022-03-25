import { StringLiteralLike } from "typescript";
import { useTodo } from "../../hooks/useTodo";
import { TodoContext } from "./todoContext";

export const TodoContextProvider: React.FC<{}> = (props) => {
    const {
        tasks, 
        addTask,
        deleteTask,
        toggleCompleted
      } = useTodo();
      
    return(
        <TodoContext.Provider
            value={{
                tasks: tasks,
                addTask: addTask,
                deleteTask: deleteTask,
                toggleCompleted: toggleCompleted
            }}>
                {props.children}
        </TodoContext.Provider>
    )
}