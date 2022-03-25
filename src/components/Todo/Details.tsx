import { Button, Card, CardActions, CardContent, Typography, TextField, ClickAwayListener } from "@mui/material";
import { useContext, useState } from "react";
import { TodoContext } from "../../context/todo/todoContext";
import { ITodo } from "../../models/ITodo";

export const Details = (props: ITodo) => {
    const [isEdit, setIsEdit] = useState<boolean>(false);
    const [text, setText] = useState<string>(props.text);

    const todoContext = useContext(TodoContext);

    const onChangeTextHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setText(e.target.value);
    };

    return (
        <ClickAwayListener onClickAway={() => setIsEdit(false)}>
            <Card sx={{ width: 200, height: "auto" }} variant={"outlined"}>
                <CardContent>
                    {
                        !isEdit && 
                        <Typography onClick={() => setIsEdit(true)}>
                            {props.text}
                        </Typography>
                    }
                    {
                        isEdit &&
                        <TextField multiline fullWidth value={text} placeholder={"Enter task"} onChange={onChangeTextHandler} variant="outlined"/>
                    }
                </CardContent>
                <CardActions>
                    <Button onClick={() => todoContext.deleteTask!(props.id)} size="small">Delete</Button>
                </CardActions>
            </Card>
        </ClickAwayListener>
    );
};