import { Grid, Typography, TextField, Button, Alert, Snackbar, Card, CardContent } from "@mui/material"
import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";

export const Register = () => {
    const { loading, errors, register } = useAuth();

    const [email, setEmail] = useState<string>("");
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [confirmPassword, setConfirmPassword] = useState<string>("");
    const [confirmEmail, setConfirmEmail] = useState<string>("");

    const [disableInputs, setDisableInputs] = useState<boolean>(false);
    const [showSnackbar, setShowSnackbar] = useState<boolean>(false);

    useEffect(() => {
        setDisableInputs(loading || confirmEmail.length > 0);
        if(errors?.length) setShowSnackbar(true);
    }, [loading, errors, confirmEmail]);

    const registerUser = async () => {
        const response = await register!(username, email, password, confirmPassword);
        
        setConfirmEmail(response);
    };

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        registerUser();
    };

    return (
    <>
        <Snackbar
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
            autoHideDuration={5000}
            open={showSnackbar}
            onClose={() => setShowSnackbar(false)}>
          <Alert onClose={() => setShowSnackbar(false)} severity={"error"} sx={{ width: '100%' }}>
            {errors[0]}
          </Alert>
        </Snackbar>
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
                                {
                                    !confirmEmail && <Button disabled={disableInputs} type={"submit"} fullWidth variant="contained">Submit</Button>
                                }
                                {
                                    confirmEmail && <Button target="_blank" href={confirmEmail} fullWidth variant="contained">Click here to confirm your email</Button>
                                }
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