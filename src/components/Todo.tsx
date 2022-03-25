import { Grid, Typography } from "@mui/material";
import { TodoContextProvider } from "../context/todo/todoContextProvider";
import { Add } from "./Todo/Add";
import { List } from "./Todo/List";

export const Todo = () => {
    return (
    <TodoContextProvider>
        <Grid container direction={'column'} spacing={4}>
            <Grid item>
                <Typography style={{textAlign: "center"}} variant="h2" component="div">
                    Todo
                </Typography>
            </Grid>
            <Grid item>
                <Grid container direction={"column"} alignItems={"center"} spacing={2} >
                    <Grid item sx={{width: 1/4}}>
                        <Add/>
                    </Grid>
                    <Grid item sx={{width: 1}}>
                        <List/>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
      </TodoContextProvider>
    );
};