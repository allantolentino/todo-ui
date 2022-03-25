import axios, { AxiosError } from "axios";
import { useState } from "react";
import { AuthContext } from "./authContext";

const LOGIN_URL: string = "https://localhost:5001/Users/Login";
const REGISTER_URL: string = "https://localhost:5001/Users/Register";

export const AuthProvider: React.FC<{}> = (props) => {
    const [authenticated, setAuthenticated] = useState<boolean>(false);
    const [success, setSuccess] = useState<boolean | undefined | null>();
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<any | undefined>();

    const login = async (email: string, password: string)=> {
        try {
            setSuccess(undefined);
            setError(undefined);
            setLoading(true);

            const token = await axios.post(LOGIN_URL,
                JSON.stringify({ email, password }),
                {
                    headers: { 'Content-Type': 'application/json' }
                }
            );

            setAuthenticated(true);
            setSuccess(true);
        } catch (err: any) {
            setSuccess(false);
            setError(err.response.data);
        } finally {
            setLoading(false);
        }
    }

    const register = async (username: string, email: string, password: string, confirmPassword: string): Promise<string> => {
        let result = "";
        
        try {
            setSuccess(undefined);
            setError(undefined);
            setLoading(true);

            const response = await axios.post<string>(REGISTER_URL,
                JSON.stringify({ email, username, password, confirmPassword }),
                {
                    headers: { 'Content-Type': 'application/json' }
                }
            );

            setSuccess(true);

            result = response.data;
        } catch (err: any) {
            setSuccess(false);
            setError(err.response.data);
        } finally {
            setLoading(false);
        }

        return result;
    }

    return(
        <AuthContext.Provider value={{
            authenticated: authenticated, 
            success: success,
            loading: loading,
            error: error,
            login: login,
            register: register}}>
            {props.children}
        </AuthContext.Provider>
    )
}