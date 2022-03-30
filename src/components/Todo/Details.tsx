import React, { useEffect, useState } from "react";
import { Card, 
        CardActions, 
        CardContent, 
        Typography,
        ClickAwayListener, 
        IconButton, 
        Grow, 
        Fade, 
        InputBase } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import { useTodo } from "../../hooks/useTodo";
import { ITodo } from "../../models/ITodo";

export const Details = (props: ITodo) => {
    const { loading, getTodos, deleteTodo, updateTodo } = useTodo();
    
    /** Todo states */
    const [text, setText] = useState<string>(props.text);

    /** UI states */
    const [editMode, setEditMode] = useState<boolean>(false);
    const [showOtherActions, setShowOtherActions] = useState<boolean>(false);
    const [visible, setVisible] = useState<boolean>(true);

    /** Make sure that the component's states are up-to-date */
    useEffect(() => {
        if(!loading) setText(props.text);
    }, [props.text, loading]);

    /** Update state of text based on user input */
    const onChangeTextHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setText(e.target.value);
    };

    /** Toggle edit mode when user clicks on the component */
    const onToggleEdit = () => {
        setEditMode(!editMode);
    };

    /** Show or hide the card action buttons */
    const handleMouseEvent = (action: "showButtons" | "hideButtons") => 
                             (e: React.MouseEvent<HTMLDivElement>) => {
        setShowOtherActions(action === "showButtons");
    };

    /** Update todo when user clicks away from input */
    const onClickAwayHandler = (e: MouseEvent | TouchEvent) => {
        //Only call update when component is in edit mode
        if(editMode && text && props.text != text) updateTodo(props.id, text).finally(() => getTodos!());
        //Revert to original when empty
        else if(!text.length) setText(props.text);

        //Always set edit mode to false when user clicks away from the text box
        setEditMode(false);
    };

    /** Delete todo when user clicks on the delete button */
    const onDeleteHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
        setVisible(false);
        deleteTodo(props.id).finally(() => getTodos!());
    };

    return (
        <Grow in={visible} timeout={500}>
            <Card className="pending"
                onMouseOver={handleMouseEvent("showButtons")} 
                onMouseLeave={handleMouseEvent("hideButtons")}>
                <CardContent>
                {
                    /** Show label if state is readonly */
                    !editMode && 
                    <Typography className="textLabel" 
                                onClick={onToggleEdit}> 
                        {text}
                    </Typography>
                }
                {
                    /** Show text field if state is editable */
                    editMode &&
                    <ClickAwayListener onClickAway={onClickAwayHandler}>
                        <InputBase autoFocus 
                                multiline 
                                fullWidth
                                className="textInput"
                                autoComplete="off"
                                value={text} 
                                placeholder={"Enter task"} 
                                onChange={onChangeTextHandler}/>
                    </ClickAwayListener>
                }
                </CardContent>
                <Fade in={showOtherActions && !editMode}>
                    <CardActions className="actions">
                        <IconButton size="small" onClick={onDeleteHandler} >
                            <DeleteIcon />
                        </IconButton>
                    </CardActions>
                </Fade>
            </Card>
        </Grow>
    );
};