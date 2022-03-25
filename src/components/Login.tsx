import { Grid, TextField, Button, Typography, Box, Container, Paper, Snackbar, Alert } from "@mui/material"
import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth"

export const Login = () => {
    const { authenticated, loading, errors, login } = useAuth();
    
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [showSnackbar, setShowSnackbar] = useState<boolean>(false);

    const navigate = useNavigate();

    useEffect(() => {
        if(authenticated) navigate("/todo");

        if(errors?.length) setShowSnackbar(true);
    }, [authenticated, loading, errors]);

    const onFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        login!(email, password);
    };

    return (
    <form onSubmit={onFormSubmit}>
        <Snackbar
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
            autoHideDuration={5000}
            open={showSnackbar}
            onClose={() => setShowSnackbar(false)}
        >
          <Alert onClose={() => setShowSnackbar(false)} severity={"error"} sx={{ width: '100%' }}>
            {errors[0]}
          </Alert>
        </Snackbar>
        <Grid container 
            height={"100vh"}
            direction={"column"}
            alignItems={"center"}
            justifyContent={"center"}
            spacing={2}  >
            <Grid item>
                <Typography variant="h4" component="div">
                    Login
                </Typography>
            </Grid>
            <Grid item>
                <TextField onChange={e => setEmail(e.target.value)} label="Email" variant="standard"/>
            </Grid>
            <Grid item>
                <TextField onChange={e => setPassword(e.target.value)} type={"password"} label="Password" variant="standard"/>
            </Grid>
            <Grid item>
                <Button type={"submit"} disabled={loading} sx={{width:1}} variant="contained">Login</Button>
            </Grid>
            <Grid item>
                <Button fullWidth href="/register" variant="text">Register</Button>
            </Grid>
        </Grid>
    </form>
    )
}