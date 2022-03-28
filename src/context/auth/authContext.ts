import React from "react";

export interface IAuthContext {
    token: string;
    authenticated: boolean;
    status: string;
    success: boolean | undefined | null;
    loading: boolean;
    errors: string[];
    login?: (username: string, password: string) => void;
    logout?: () => void;
    register?: (username: string, email: string, password: string, confirmPassword: string) => Promise<string>;
};

export const AuthContext = React.createContext<IAuthContext>(
    {
        token: "",
        authenticated: false, 
        status: "",
        success: false, 
        loading: false, 
        errors: []
    });