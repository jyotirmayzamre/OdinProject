import { useOutletContext } from "react-router-dom";
import { Link } from "react-router-dom";
import CartCard from "../cart-card/CartCard";
import './Cart.css';

function Cart(){
    const { cart, removeItem, updateQuantity, quantity, total } = useOutletContext();


    return(
        <div className="cart-main">
            <h1>Your Shopping Cart</h1>
            {quantity === 0 ? (
                <p>Your cart is empty. <Link to='/shop'>Continue Shopping</Link></p>
            ) : (
                <div className="items">
                    {Object.values(cart).map(item => {
                        return <CartCard key={item.product.ID} prod={item} removeItem={removeItem} updateQuantity={updateQuantity}/>
                    })}
                </div>
            )
               
        }
            <h3>Total: ${total}</h3>
            
        </div>
    )
}

export default Cart;