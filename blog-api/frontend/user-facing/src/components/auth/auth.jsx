import { Outlet } from "react-router-dom";
import Navbar from "../landing/navbar";
import '../../styles/auth.css';

function Auth(){
    return (
        <>
            <Navbar />
            <Outlet />
        </>
    )
}

export default Auth;