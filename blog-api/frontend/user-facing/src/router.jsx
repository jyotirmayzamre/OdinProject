import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import Auth from './components/auth/auth';
import Login from './components/auth/login';
import Register from './components/auth/register'
import Postslist from './components/blogs/postsList';
import Posts from './components/blogs/posts';
import Post from './components/blogs/post';
import ErrorPage from './components/error';
import { getPosts, getPost } from './utilities/loaders';


const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        errorElement: <ErrorPage />
    },
    {
        path: 'auth',
        element: <Auth />,
        children: [
            { path: 'login', element: <Login />},
            { path: 'register', element: <Register />}
        ]
    },
    {
        path: 'posts',
        element: <Posts />,
        errorElement: <ErrorPage />,
        children: [
            { index: true, element: <Postslist />, loader: getPosts, errorElement: <ErrorPage /> },
            { path: ':id', element: <Post />, loader: getPost, errorElement: <ErrorPage /> }
        ]
    }
])

export default router;