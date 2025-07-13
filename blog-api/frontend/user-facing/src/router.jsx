import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import Login from './components/login';
import Register from './components/register';

const router = createBrowserRouter([
    {
        path: '/',
        element: <App />
    },
    {
        path: 'login',
        element: <Login />
    },
    {
        path: 'register',
        element: <Register />
    }
])

export default router;