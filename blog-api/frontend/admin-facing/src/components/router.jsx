import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import Auth from './auth/auth';
import Login from './auth/login';
import Posts from './blogs/posts';
import Postslist from './blogs/postsList';
import Post from './blogs/post';
import { postsListLoader, postLoader } from '../utilities/loaders';


const router = createBrowserRouter([
    {
        path: '/',
        element: <App />
    }, 
    {
        path: 'auth',
        element: <Auth />,
        children: [
            { path: 'login', element: <Login /> }
        ]
    },
    {
        path: 'posts',
        element: <Posts />,
        children: [
            { index: true, element: <Postslist />, loader: postsListLoader },
            { path: ':id', element: <Post />, loader: postLoader }
        ]
    }
    
])

export default router;