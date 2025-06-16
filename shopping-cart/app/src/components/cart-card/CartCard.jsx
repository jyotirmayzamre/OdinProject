import { useState } from "react";
import './CartCard.css';

function CartCard({ prod, removeItem }){
    const [quantity, setQuantity] = useState(prod.quantity);

    function clickHandler(id){
        removeItem(id);
        setQuantity(0);
    }

    return (
        <div className="cart-card">
            <div className="options">
                <img src={prod.product.Url}></img>
                <div className="quantityControls">
                    <button className='btn'>-</button>
                    <input type="number" value={quantity} min="1" aria-label="product-quantity"></input>
                    <button className="btn">+</button>
                </div>
            </div>
            <div className="desc">
                <h3>{prod.product.Name}</h3>
                <p>${prod.product.Price}</p>
                <button className="remove" onClick={()=>{clickHandler(prod.product.ID)}}>Remove</button>
            </div>
        </div>
    )
}

export default CartCard;