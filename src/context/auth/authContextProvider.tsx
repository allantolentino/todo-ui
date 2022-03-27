import axios from "axios";
import { useEffect, useState } from "react";
import { AuthContext } from "./authContext";

axios.defaults.baseURL = "https://b6g1.azurewebsites.net";

const LOGIN_URL: string = "/Users/Login";
const REGISTER_URL: string = "/Users/Register";

export const AuthProvider: React.FC<{}> = (props) => {
    const [token, setToken] = useState<string>("");
    const [authenticated, setAuthenticated] = useState<boolean>(false);
    const [success, setSuccess] = useState<boolean | undefined | null>();
    const [loading, setLoading] = useState<boolean>(false);
    const [errors, setError] = useState<string[]>([]);

    useEffect(() => {
        if(token) {
            localStorage.setItem("todoJwt", token);
            axios.defaults.headers.common["Authorization"] = token;
            setAuthenticated(true);
        }
    }, [token]);

    useEffect(() => {
        const jwt = localStorage.getItem("todoJwt");

        if(jwt) {
            axios.defaults.headers.common["Authorization"] = jwt;
            setAuthenticated(true);
            setToken(jwt);
        }
    }, []);

    const login = async (email: string, password: string)=> {
        try {
            setSuccess(undefined);
            setError([]);
            setLoading(true);

            const response = await axios.post<string>(LOGIN_URL,
                JSON.stringify({ email, password }),
                {
                    headers: { 'Content-Type': 'application/json' }
                }
            );

            setToken(response.data);
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

    const logout = () => {
        setToken("");
        setAuthenticated(false);
        localStorage.removeItem("todoJwt");
        axios.defaults.headers.common["Authorization"] = "";
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
            token: token,
            success: success,
            loading: loading,
            errors: errors,
            login: login,
            logout: logout,
            register: register}}>
            {props.children}
        </AuthContext.Provider>
    )
}