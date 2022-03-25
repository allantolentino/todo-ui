import { Grid, TextField, Button, Typography } from "@mui/material"
import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth"

export const Login = () => {
    const { authenticated, loading, errors, login } = useAuth();
    
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const navigate = useNavigate();

    useEffect(() => {
        if(authenticated) navigate("/todo");
    }, [authenticated, loading, errors]);

    const onFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
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
            <Grid item sx={{width:400}}>
                <TextField onChange={e => setEmail(e.target.value)} fullWidth label="Email" variant="standard"/>
            </Grid>
            <Grid item sx={{width:400}}>
                <TextField onChange={e => setPassword(e.target.value)} fullWidth label="Password" variant="standard"/>
            </Grid>
            <Grid item>
                <Typography variant={"caption"} component="div">
                    {errors.length > 0 && errors[0]}
                </Typography>
            </Grid>
            <Grid item>
                <Button type={"submit"} disabled={loading} fullWidth sx={{width:1}} variant="contained">Login</Button>
            </Grid>
            <Grid item>
                <Button href="/register" variant="text">Register</Button>
            </Grid>
        </Grid>
    </form>
    )
}