import { Grid, Typography, TextField, Button } from "@mui/material"
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

export const Register = () => {
    const { loading, error, register } = useAuth();

    const [email, setEmail] = useState<string>('');
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const [confirmEmail, setConfirmEmail] = useState<string>('');

    const [disableInputs, setDisableInputs] = useState<boolean>(false);
    const [registerError, setRegisterError] = useState<string>("");

    useEffect(() => {
        setDisableInputs(loading);
        setDisableInputs(confirmEmail.length > 0);

        if(error){
            setRegisterError("Something went wrong. Please try again.");
        }
    }, [loading, error, confirmEmail]);

    const registerUser = async () => {
        setRegisterError("");
        
        const response = await register!(username, email, password, confirmPassword);
        
        setConfirmEmail(response);
    };

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        registerUser();
    };

    return (
    <form onSubmit={onSubmit}>
        <Grid container direction={'column'} alignItems={"center"} spacing={4}>
            <Grid item>
                <Typography variant="h2" component="div">
                    Register
                </Typography>
            </Grid>
            <Grid item>
                <Grid container spacing={4}>
                    <Grid item>
                        <TextField disabled={disableInputs} value={email} onChange={e => setEmail(e.target.value)} label="Email" variant="standard"/>
                    </Grid>
                    <Grid item>
                        <TextField disabled={disableInputs} value={username} onChange={e => setUsername(e.target.value)} label="Username" variant="standard"/>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item>
                <Grid container spacing={4}>
                    <Grid item>
                        <TextField disabled={disableInputs} value={password} onChange={e => setPassword(e.target.value)} label="Password" variant="standard"/>
                    </Grid>
                    <Grid item>
                        <TextField disabled={disableInputs} value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} label="Confirm Password" variant="standard"/>
                    </Grid>
                </Grid>
            </Grid>
            <Grid item sx={{width: 1/5}}>
                <Typography variant={"caption"} component="div">
                    {registerError}
                </Typography>
            </Grid>
            <Grid item sx={{width: 1/5}}>
                {
                    !confirmEmail && <Button disabled={disableInputs} type={"submit"} fullWidth variant="contained">Submit</Button>
                }
                {
                    confirmEmail && <Button target="_blank" href={confirmEmail} fullWidth variant="text">Click here to confirm your email</Button>
                }
            </Grid>
            <Grid item>
                {
                    !confirmEmail && <Button href="/login" variant="text">Login</Button>
                }
            </Grid>
        </Grid>
    </form>
    )
}