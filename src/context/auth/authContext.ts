import React from "react";

export interface IAuthContext {
    authenticated: boolean;
    success: boolean | undefined | null;
    loading: boolean;
    error: any;
    login?: (username: string, password: string) => void;
    register?: (username: string, email: string, password: string, confirmPassword: string) => Promise<string>;
};

export const AuthContext = React.createContext<IAuthContext>(
    {
        authenticated: false, 
        success: false, 
        loading: false, error: ""
    });