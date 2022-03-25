import { Grid, Typography } from "@mui/material"

export const Unauthorized = () => {
    return (
    <Grid container direction={'column'} alignItems={"center"} spacing={4}>
        <Grid item>
            <Typography variant="h2" component="div">
                You are not authorized to access this page!
            </Typography>
        </Grid>
    </Grid>
    )
}