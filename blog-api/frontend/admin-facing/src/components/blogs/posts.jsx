import { Outlet, Navigate } from "react-router-dom";
import Navbar from "../landing/navbar";

function Posts(){
    const token = localStorage.getItem('token');

    if(!token){
        return <Navigate to='/auth/login' replace />
    } 
    
    return (
        <>
            <Navbar />
            <Outlet />
        </>
    )
}

export default Posts;