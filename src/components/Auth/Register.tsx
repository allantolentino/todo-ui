import { Grid, Typography, TextField, Button, Card, CardContent } from "@mui/material"
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

export const Register = () => {
    const { loading, success, status, register } = useAuth();
    const navigate = useNavigate();

    const [email, setEmail] = useState<string>("");
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [confirmPassword, setConfirmPassword] = useState<string>("");
    const [disableInputs, setDisableInputs] = useState<boolean>(false);

    useEffect(() => {
        setDisableInputs(loading || status !== "none");
    }, [loading, status]);

    useEffect(() => {
        if(success) navigate("/todo");
    }, [success]);

    const registerUser = async () => {
        await register!(username, email, password, confirmPassword);
    };

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        registerUser();
    };

    return (
    <>
        <form onSubmit={onSubmit}>
            <div className="register container">
                <Card className="wrapper">
                    <CardContent>
                        <Grid container flexDirection={"column"} spacing={2}>
                            <Grid item>
                                <Typography variant="h4" component="div" textAlign={"center"}>
                                    Register
                                </Typography>
                            </Grid>
                            <Grid item>
                                <TextField required fullWidth disabled={disableInputs} value={email} onChange={e => setEmail(e.target.value)} label="Email" variant="standard"/>
                            </Grid>
                            <Grid item>
                                <TextField required fullWidth disabled={disableInputs} value={username} onChange={e => setUsername(e.target.value)} label="Username" variant="standard"/>
                            </Grid>
                            <Grid item>
                                <TextField required fullWidth type={"password"} disabled={disableInputs} value={password} onChange={e => setPassword(e.target.value)} label="Password" variant="standard"/>
                            </Grid>
                            <Grid item>
                                <TextField required fullWidth type={"password"} disabled={disableInputs} value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} label="Confirm Password" variant="standard"/>
                            </Grid>
                            <Grid item>
                                <Button disabled={disableInputs} type={"submit"} fullWidth variant="contained">
                                    {
                                        status === "none" && "Submit"
                                    }
                                    {
                                        status === "register" && "Registering..."
                                    }
                                    {
                                        status === "confirm" && "Confirming email..."
                                    }
                                    {
                                        status === "login" && "Logging you in..."
                                    }
                                </Button>
                            </Grid>
                            <Grid item>
                                <Button fullWidth href="/login" variant="text">Login</Button>
                            </Grid>
                        </Grid>
                        </CardContent>
                    </Card>
            </div>
        </form>
    </>
    );
}