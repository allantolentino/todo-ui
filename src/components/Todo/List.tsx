import { Grid, Typography } from "@mui/material";
import { useContext } from "react";
import { TodoContext } from "../../context/todo/todoContext";
import { Details } from "./Details";

export const List = () => {
    const todoContext = useContext(TodoContext)

    return(
        <Grid container alignItems={"center"} direction={"column"}>
            <Grid item>
                {
                    todoContext.tasks.length > 0 && 
                    <Grid container direction={"row"}  spacing={2} justifyContent={"center"}>
                        {
                            todoContext.tasks.map(p => 
                                <Grid item key={p.id}>
                                    <Details {...p} />
                                </Grid>
                            )
                        }
                    </Grid>
                }
                {
                    !todoContext.tasks.length && 
                    <Typography>
                        You don't have any tasks!
                    </Typography>
                }
            </Grid>
        </Grid>
    );
};