import { Link } from 'react-router-dom';
import cart from "../../assets/shopping-cart.png"
import './Navbar.css';

function Navbar({ quantity }){
    
    return (
        <header className="nav">
            <h1>JyotirmayMart</h1>
            <div className="pages">
                <Link to='/' className='link'>Home</Link>
                <Link to='/shop' className='link'>Shop</Link>
            </div>
            <Link to='/cart'>
                <div className='cart-container' >
                    <img src={cart} alt='Shopping Cart'></img>
                    <p>{quantity}</p>
                    <p>Items</p>
                </div>
            </Link>
            
        </header>
    )
}

export default Navbar;