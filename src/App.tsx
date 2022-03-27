import './App.css';
import { Route, Routes } from 'react-router-dom';
import { Todo } from './components/Todo';
import { Register } from './components/Auth/Register';
import { Login } from './components/Auth/Login';
import { NotFound } from './components/Auth/NotFound';
import { Layout } from './components/Layout';
import { RequireAuth } from './components/Auth/RequireAuth';
import { TodoContextProvider } from './context/todo/todoContextProvider';
import { Snackbar, Alert } from '@mui/material';
import useAuth from './hooks/useAuth';
import { useEffect, useState } from 'react';
import { useTodo } from './hooks/useTodo';

function App() { 
  const { errors: authErrors } = useAuth();
  const { errors: todoErrors} = useTodo();
  
  const [showSnackbar, setShowSnackbar] = useState<boolean>(false);
  const [snackbarMessage, setSnackbarMessage] = useState<string>("");

  useEffect(() => {
    setShowSnackbar(authErrors.length > 0 || todoErrors.length > 0);
    
    if(authErrors.length) {
      setSnackbarMessage(authErrors[0]);
    }

    if(todoErrors.length) {
      setSnackbarMessage(todoErrors[0]);
    }
  }, [authErrors, todoErrors]);

  return (
  <>
      <Snackbar
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          autoHideDuration={5000}
          open={showSnackbar}
          onClose={() => setShowSnackbar(false)}
      >
        <Alert onClose={() => setShowSnackbar(false)} severity={"error"} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="login" element={<Login />}/>
          <Route path="register" element={<Register />}/>
          
          <Route element={<RequireAuth />}>
            <Route path="/" element={<Todo />}/>
            <Route path="todo" element={<Todo />}/>
          </Route>

          <Route path="*" element={<NotFound />}/>
        </Route>
      </Routes>
 </>);
}

export default App;
