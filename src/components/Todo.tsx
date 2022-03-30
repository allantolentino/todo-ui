import { Alert, Button, CircularProgress, Snackbar } from "@mui/material";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { useTodo } from "../hooks/useTodo";
import { Add } from "./Todo/Add";
import { List } from "./Todo/List";

export const Todo = () => {
    const {loading} = useTodo();

    return (
    <>
        <div className="add container">
            <div className="wrapper">
                <Add/>
            </div>
        </div>
        <div className="list container">
            <List />
        </div>
        {
            /** Loading indicator */
            loading &&
            <div className="loading container">
                <div className="wrapper">
                    <CircularProgress />
                </div>
            </div>
        }
    </>);
};