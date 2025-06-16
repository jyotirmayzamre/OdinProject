import { useState } from "react";
import "./ProductCard.css";

function ProductCard({ product, addToCart }){
    const [quantity, setQuantity] = useState(1);


    function increment(){
        setQuantity(prev => prev + 1);
    }

    function decrement(){
        setQuantity(prev => Math.max(prev - 1, 1));
    }

    function set(e){
        const val = e.target.value;
        setQuantity(Math.max(1, val));
    }
    

    return (
        <div className="productCard">
            <div className="img-container">
                <img src={product.Url} alt={product.Name} loading="lazy"></img>
            </div>
            <div className="info-container">
                <h3>{product.Name}</h3>
                <p>${product.Price}</p>
                <div className="quantityControls">
                    <button className='btn' onClick={decrement}>-</button>
                    <input type="number" value={quantity} min="1" aria-label="product-quantity" onChange={set}></input>
                    <button className="btn" onClick={increment}>+</button>
                </div>
                <button className="btn cart" onClick={() => addToCart({product: product, quantity: quantity})}>Add to Cart</button>
            </div>

        </div>
    )
}

export default ProductCard;