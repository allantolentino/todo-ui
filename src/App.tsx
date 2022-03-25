import './App.css';
import { Route, Routes } from 'react-router-dom';
import { Todo } from './components/Todo';
import { Register } from './components/Register';
import { Login } from './components/Login';
import { NotFound } from './components/NotFound';
import { Layout } from './components/Layout';
import { Unauthorized } from './components/Unauthorized';
import { RequireAuth } from './components/RequireAuth';

function App() { 
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="login" element={<Login />}/>
        <Route path="register" element={<Register />}/>
        <Route path="unauthorized" element={<Unauthorized />}/>
        
        <Route element={<RequireAuth />}>
          <Route path="/" element={<Todo />}/>
          <Route path="todo" element={<Todo />}/>
        </Route>

        <Route path="*" element={<NotFound />}/>
      </Route>
    </Routes>
  );
}

export default App;
