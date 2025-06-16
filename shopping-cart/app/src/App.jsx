import { Outlet } from "react-router-dom";
import { useState } from "react";
import Navbar from "./components/navbar/Navbar";

function App(){
    const [cart, setCart] = useState({});
    const [quantity, setQuantity] = useState(0);
    const [total, setTotal] = useState(0);

    function addToCart(item){
        let copy = {...cart};
        if(!copy[item.product.ID - 1]){
            copy[item.product.ID - 1] = { ...item};
        } else {
            copy[item.product.ID - 1].quantity += item.quantity;
        }
        setCart(copy);
        setQuantity(prev => prev + item.quantity);
        setTotal(prev => prev + (item.quantity * item.product.Price));
    }

    function removeItem(id){
        let copy = {...cart};
        let instance = copy[id];
        delete copy[id];
        setCart(copy);
        setQuantity(prev => prev - instance.quantity);
        setTotal(prev => prev - (instance.quantity * instance.product.Price));

    }


    return(
        <>
            <Navbar quantity={ quantity }/>
            <Outlet context={{ cart, addToCart, removeItem, quantity, total }} />

        </>
    )
} 

export default App;