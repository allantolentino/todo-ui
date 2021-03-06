import { InputBase, TextField } from "@mui/material";
import React, { useState } from "react";
import { useTodo } from "../../hooks/useTodo";

export const Add = () => {
    const { getTodos, addTodo } = useTodo();
    
    const [text, setText] = useState<string>('');

    const onChangeTextHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setText(e.target.value);
    };

    const onFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        addTodo(text).finally(() => getTodos!());

        setText("");
    };

    return(
    <form onSubmit={onFormSubmit}>
        {/* <TextField  autoComplete="off" 
                    fullWidth
                    size={"small"}
                    value={text} 
                    variant={"outlined"} 
                    placeholder="Create a new task..."
                    onChange={onChangeTextHandler} /> */}
        <InputBase autoFocus 
                fullWidth
                className="textInput"
                autoComplete="off"
                value={text} 
                placeholder="Create a new task..."
                onChange={onChangeTextHandler}/>
    </form>
    );
};