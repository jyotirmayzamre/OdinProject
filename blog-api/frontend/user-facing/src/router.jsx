import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import Auth from './components/auth/auth';
import Login from './components/auth/login';
import Register from './components/auth/register'


const router = createBrowserRouter([
    {
        path: '/',
        element: <App />
    },
    {
        path: 'auth',
        element: <Auth />,
        children: [
            { path: 'login', element: <Login />},
            { path: 'register', element: <Register />}
        ]
    }
])

export default router;