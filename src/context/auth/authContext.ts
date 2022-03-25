import React from "react";

export interface IAuthContext {
    token: string;
    authenticated: boolean;
    success: boolean | undefined | null;
    loading: boolean;
    errors: string[];
    login?: (username: string, password: string) => void;
    register?: (username: string, email: string, password: string, confirmPassword: string) => Promise<string>;
};

export const AuthContext = React.createContext<IAuthContext>(
    {
        token: "",
        authenticated: false, 
        success: false, 
        loading: false, 
        errors: []
    });