import { Grid, TextField, Button, Typography, Box, Container, Paper, Snackbar, Alert, CardContent, Card } from "@mui/material"
import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth"

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
        <div className="login container">
            <Card className="wrapper">
                <CardContent>
                    <Grid container flexDirection={"column"} spacing={2}>
                        <Grid item>
                            <Typography textAlign={"center"} variant="h4" component="div">Login</Typography>
                        </Grid>
                        <Grid item>
                            <TextField required fullWidth onChange={e => setEmail(e.target.value)} label="Email" variant="standard"/>
                        </Grid>
                        <Grid item>
                            <TextField required fullWidth onChange={e => setPassword(e.target.value)} type={"password"} label="Password" variant="standard"/>
                        </Grid>
                        <Grid item>
                            <Button type={"submit"} disabled={loading} sx={{width:1}} variant="contained">Login</Button>
                        </Grid>
                        <Grid item>
                            <Button fullWidth href="/register" variant="text">Register</Button>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        </div>
    </form>
    )
}