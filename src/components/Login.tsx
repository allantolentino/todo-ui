import { Grid, TextField, Button, Typography } from "@mui/material"
import axios from "axios";
import React, { useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth"

export const Login = () => {
    const { authenticated, loading, error, login } = useAuth();
    
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    
    const [emailErrors, setEmailErrors] = useState<string[]>([]);
    const [passwordErrors, setPasswordErrors] = useState<string[]>([]);
    const [loginError, setLoginError] = useState<string>("");

    const navigate = useNavigate();

    useEffect(() => {
        if(authenticated)
            navigate("/todo");

        if(error) {
            if(error.Email) setEmailErrors(error.Email.map((e: string) => e));
            if(error.Password) setPasswordErrors(error.Password.map((e: string) => e));

            if(!error.Email && !error.Passowrd) setLoginError("Something went wrong. Please try again.");
        }
    }, [authenticated, error]);

    const onFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        setEmailErrors([]);
        setPasswordErrors([]);

        login!(email, password);
    };

    return (
    <form onSubmit={onFormSubmit}>
        <Grid container direction={'column'} alignItems={"center"} spacing={4}>
            <Grid item>
                <Typography variant="h2" component="div">
                    Login
                </Typography>
            </Grid>
            <Grid item sx={{width:1/6}}>
                <TextField onChange={e => setEmail(e.target.value)} fullWidth label="Email" variant="standard"/>
                <Typography variant={"caption"} component="div">
                    {emailErrors}
                </Typography>
            </Grid>
            <Grid item sx={{width:1/6}}>
                <TextField onChange={e => setPassword(e.target.value)} fullWidth label="Password" variant="standard"/>
                <Typography variant={"caption"} component="div">
                    {passwordErrors}
                </Typography>
            </Grid>
            <Grid item sx={{width:1/6}}>
                <Typography variant={"caption"} component="div">
                    {loginError}
                </Typography>
            </Grid>
            <Grid item sx={{width:1/6}}>
                <Button type={"submit"} disabled={loading} fullWidth sx={{width:1}} variant="contained">Login</Button>
            </Grid>
            <Grid item>
                <Button href="/register" variant="text">Register</Button>
            </Grid>
        </Grid>
    </form>
    )
}