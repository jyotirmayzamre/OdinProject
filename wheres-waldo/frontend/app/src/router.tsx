import { createBrowserRouter } from "react-router-dom";
import Home from "./components/home";
import Game from "./components/game";
import { mapsLoader } from "./utilities/loaders";


const router = createBrowserRouter([
    {
        path: '/',
        element: <Home />,
        loader: mapsLoader
    },
    {
        path: '/games/:id',
        element: <Game />
    }
]);

export default router;