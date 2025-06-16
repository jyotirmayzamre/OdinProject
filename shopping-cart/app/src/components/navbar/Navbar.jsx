import { Link } from 'react-router-dom';
import cart from "../../assets/shopping-cart.png"
import './Navbar.css';

function Navbar(){
    
    return (
        <header className="nav">
            <h1>JyotirmayMart</h1>
            <div className="pages">
                <a>Home</a>
                <a>Shop</a>
                {/* <Link to='home'>Home</Link>
                <Link to='shop'>Shop</Link> */}
            </div>
            <div className='cart-container'>
                <img src={cart} alt='Shopping Cart'></img>
                <p>0</p>
                <p>Items</p>
            </div>
        </header>
    )
}

export default Navbar;