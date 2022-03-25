import axios from "axios";
import { useState } from "react";
import { AuthContext } from "./authContext";

const LOGIN_URL: string = "https://b6g1.azurewebsites.net/Users/Login";
const REGISTER_URL: string = "https://b6g1.azurewebsites.net/Users/Register";

export const AuthProvider: React.FC<{}> = (props) => {
    const [authenticated, setAuthenticated] = useState<boolean>(false);
    const [success, setSuccess] = useState<boolean | undefined | null>();
    const [loading, setLoading] = useState<boolean>(false);
    const [errors, setError] = useState<string[]>([]);

    const login = async (email: string, password: string)=> {
        try {
            setSuccess(undefined);
            setError([]);
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
            if(err.response?.data[""]){
                setError(err.response?.data[""]);
            }
            else if(err.response.data.errors)
                setError(err.response?.data?.errors);
            else
                setError(["Something went wrong. Please try again."]);
        } finally {
            setLoading(false);
        }
    }

    const register = async (username: string, email: string, password: string, confirmPassword: string): Promise<string> => {
        let result = "";
        
        try {
            setSuccess(undefined);
            setError([]);
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

            if(err.response?.data[""]){
                setError(err.response?.data[""]);
            }
            else if(err.response?.data?.errors)
                setError(err.response.data.errors);
            else
                setError(["Something went wrong. Please try again."]);
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
            errors: errors,
            login: login,
            register: register}}>
            {props.children}
        </AuthContext.Provider>
    )
}