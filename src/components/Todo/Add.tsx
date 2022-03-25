import { Grid, TextField, Button, Box, CircularProgress, LinearProgress } from "@mui/material";
import React, { useState } from "react";
import { useTodo } from "../../hooks/useTodo";

export const Add = () => {
    const { loading, addTask } = useTodo();
    
    const [text, setText] = useState<string>('');

    const onChangeTextHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setText(e.target.value);
    };

    const onFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if(text && addTask) addTask(text);

        setText("");
    };

    return(
        <form onSubmit={onFormSubmit}>
            <TextField autoComplete="off" 
                        value={text} 
                        onChange={onChangeTextHandler} 
                        label="Enter task" variant="standard"/>
        </form>
    );
};