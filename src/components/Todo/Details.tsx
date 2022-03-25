import { Button, Card, CardActions, CardContent, Typography, TextField, ClickAwayListener, IconButton, Grow } from "@mui/material";
import { Box } from "@mui/system";
import { useEffect, useRef, useState } from "react";
import { useTodo } from "../../hooks/useTodo";
import { ITodo } from "../../models/ITodo";
import DeleteIcon from '@mui/icons-material/Delete';

export const Details = (props: ITodo) => {
    const { deleteTask, updateTask } = useTodo();

    const [isEdit, setIsEdit] = useState<boolean>(false);
    const [text, setText] = useState<string>(props.text);
    const [visible, setVisible] = useState<boolean>(true);

    const onChangeTextHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setText(e.target.value);
    };

    const onDeleteTask = () => {
        setVisible(false);

        deleteTask!(props.id);
    }

    const onUpdateTask = () => {
        updateTask!(props.id, text);
        setIsEdit(false);
    }

    return (
            <Grow in={visible} timeout={500}>
                <Box m={1/2}>
                    <Card sx={{width: 200}}>
                            <CardContent sx={{height: (isEdit ? "auto" : 15)}} 
                                        style={{textOverflow:"ellipsis"}}>
                                {
                                    !isEdit && 
                                    <Typography noWrap textOverflow={"ellipsis"}
                                                onClick={() => setIsEdit(true)}
                                    > 
                                        {props.text}
                                    </Typography>
                                }
                                {
                                    isEdit &&
                                    <ClickAwayListener onClickAway={() => onUpdateTask()}>
                                        <TextField autoFocus multiline 
                                                fullWidth 
                                                autoComplete="off"
                                                value={text} 
                                                placeholder={"Enter task"} 
                                                variant="outlined"
                                                onChange={onChangeTextHandler}/>
                                    </ClickAwayListener>
                                }
                            </CardContent>
                        {
                            !isEdit &&
                            <CardActions>
                                <IconButton size="small" onClick={() => onDeleteTask()} >
                                    <DeleteIcon />
                                </IconButton>
                            </CardActions>
                        }
                    </Card>
                </Box>
            </Grow>
    );
};