import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import Auth from './auth/auth';
import Login from './auth/login';
import Posts from './blogs/posts';
import Postslist from './blogs/postsList';
import EditPost from './blogs/editPost';
import CreatePost from './blogs/createPost';
import ErrorPage from '../../../user-facing/src/components/error';
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
        errorElement: <ErrorPage />,
        children: [
            { index: true, element: <Postslist />, loader: postsListLoader},
            { path: ':id', element: <EditPost />, loader: postLoader},
            { path: 'create', element: <CreatePost />}
        ]
    }
    
])

export default router;