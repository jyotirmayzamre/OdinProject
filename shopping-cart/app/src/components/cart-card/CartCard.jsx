import { useState } from "react";
import './CartCard.css';


//component for showing product cards in the cart
//calls methods to update card based on button clicks
function CartCard({ prod, removeItem, updateQuantity }){
    const [quantity, setQuantity] = useState(prod.quantity);

    function clickHandler(id){
        removeItem(id);
        setQuantity(0);
    }

    function clickHandlerUpdate(id, type){
        updateQuantity(id, type);
        if(type === 'increment') setQuantity(prev => prev + 1)
        else setQuantity(prev => Math.max(1, prev));
    }

    return (
        <div className="cart-card">
            <div className="options">
                <img src={prod.product.Url}></img>
                <div className="quantityControls">
                    <button className='btn' onClick={() => {clickHandlerUpdate(prod.product.ID, 'decrement')}}>-</button>
                    <input type="number" value={quantity} min="1" aria-label="product-quantity" readOnly='true'></input>
                    <button className="btn" onClick={() => {clickHandlerUpdate(prod.product.ID, 'increment')}}>+</button>
                </div>
            </div>
            <div className="desc">
                <h3>{prod.product.Name}</h3>
                <p>${prod.product.Price.toFixed(2)}</p>
                <button className="remove" onClick={()=>{clickHandler(prod.product.ID)}}>Remove</button>
            </div>
        </div>
    )
}

export default CartCard;