import { Grid, TextField, Button } from "@mui/material";
import React, { useContext, useState } from "react";
import { TodoContext } from "../../context/todo/todoContext";

export const Add = () => {
    const todoContext = useContext(TodoContext);
    
    const [text, setText] = useState<string>('');

    const onChangeTextHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setText(e.target.value);
    };

    const onAddTaskHandler = () => {
        if(text && todoContext.addTask)
            todoContext.addTask(text);
    };

    const onFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if(text && todoContext.addTask)
            todoContext.addTask(text);
    };

    return(
    <form onSubmit={onFormSubmit}>
        <Grid container alignItems={"center"} spacing={2}>
            <Grid item sx={{width: 1}}>
                <TextField fullWidth onChange={onChangeTextHandler} label="Enter task" variant="standard"/>
            </Grid>
            <Grid item sx={{width: 1}}>
                <Button fullWidth onClick={() => onAddTaskHandler()} variant="contained">Add</Button>
            </Grid>
        </Grid>
    </form>
    );
};