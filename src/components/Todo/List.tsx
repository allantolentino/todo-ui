import { CircularProgress, Grow, LinearProgress, Typography, Zoom } from "@mui/material";
import { Box } from "@mui/system";
import { useEffect } from "react";
import { TransitionGroup } from "react-transition-group";
import { useTodo } from "../../hooks/useTodo";
import { Details } from "./Details";

export const List = () => {
    const { tasks, loading, getTasks } = useTodo()

    useEffect(() => {
        getTasks!();
    }, [])

    return(<>
        {
            tasks.length > 0 && tasks.map(p =>  <Details key={p.id} {...p} />)
        }
        {
            !loading && !tasks.length && 
            <Box sx={{height: "50vh"}}>
                <Typography variant="h4">
                    You don't have any tasks!
                </Typography>
            </Box>
        }
        {loading && <Box m={2} sx={{width: 1}} textAlign={"center"}><CircularProgress /></Box>}
    </>);
};