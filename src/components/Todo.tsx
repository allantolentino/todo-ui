import { Box, Grid, LinearProgress, Typography } from "@mui/material";
import { TodoContextProvider } from "../context/todo/todoContextProvider";
import { useTodo } from "../hooks/useTodo";
import { Add } from "./Todo/Add";
import { List } from "./Todo/List";

export const Todo = () => {
    const { loading } = useTodo();

    return (
    <TodoContextProvider>
        <Grid container 
              direction={"column"} 
              alignItems={"center"}
              justifyContent={"center"}
              spacing={2}>
            <Grid item>
                <Typography align={"center"} 
                            component={"div"}
                            variant={"h5"}>
                    Todo
                </Typography>
            </Grid>
            <Grid item container direction={"column"} alignItems={"center"} justifyContent={"center"}>
                <Add/>
            </Grid>
            <Grid item container 
                alignItems={"flex-start"}
                justifyContent={"center"}>
                <List />
            </Grid>
        </Grid>
      </TodoContextProvider>
    );
};