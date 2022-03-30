import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/auth/authContextProvider';
import { TodoContextProvider } from './context/todo/todoContextProvider';
import { createTheme } from '@mui/material';
import { ThemeProvider } from '@emotion/react';
import { green, purple } from '@mui/material/colors';


const theme = createTheme({
  palette: {
    primary: {
      main: "#2d3436"
    },
    secondary: {
      main: "#636e72"
    },
    text: {
      primary: "#2d3436",
      secondary: "#636e72"
    }
  },
});

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <AuthProvider>
          <TodoContextProvider>
            <Routes>
              <Route path="/*" element={<App />}/>
            </Routes>
          </TodoContextProvider>
        </AuthProvider>
      </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
