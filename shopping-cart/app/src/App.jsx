import { Outlet } from "react-router-dom";
import { useState } from "react";
import Navbar from "./components/navbar/Navbar";

//parent component for home, shop, cart for context passing
function App(){
    const [cart, setCart] = useState({});
    const [quantity, setQuantity] = useState(0);
    const [total, setTotal] = useState(0);

    //function for adding an item to the cart
    function addToCart(item){
        let copy = {...cart};
        if(!copy[item.product.ID]){
            copy[item.product.ID] = { ...item};
        } else {
            copy[item.product.ID].quantity += item.quantity;
        }
        setCart(copy);
        setQuantity(prev => prev + item.quantity);
        setTotal(prev => prev + (item.quantity * item.product.Price));
    }

    //function for completely removing a product from the cart
    function removeItem(id){
        let copy = {...cart};
        const quantity = copy[id].quantity;
        const price = copy[id].product.Price;
        setQuantity(prev => prev - quantity);
        setTotal(prev => prev - (quantity * price));
        delete copy[id];
        setCart(copy);
    }

    //function for updating the quantity of a given product in cart
    function updateQuantity(id, type){
        let copy = {...cart};
        const quantity = copy[id].quantity;
        const price = copy[id].product.Price;

        if(type === 'increment'){
            setQuantity(prev => prev + 1);
            setTotal(prev => prev + price);
            copy[id].quantity += 1;
            setCart(copy);
        } else{
            if(quantity != 1){
                setQuantity(prev => prev - 1);
                setTotal(prev => prev - price);
                copy[id].quantity -= 1;
                setCart(copy);
            }
            
        }
    }


    return(
        <>
            <Navbar quantity={ quantity }/>
            <Outlet context={{ cart, addToCart, removeItem, updateQuantity,  quantity, total }} />
        </>
    )
} 

export default App;