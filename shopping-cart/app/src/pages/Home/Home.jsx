import { Link } from "react-router-dom";
import './Home.css'
import fire from '../../assets/fire.png';
import deliv from '../../assets/delivery-man.png';
import lock from '../../assets/lock.png';


//component for the home page
function Home(){
    return (
        <div className="home">
            <div className="main-card">
                <h1>Welcome to our store</h1>
                <h3>Discover amazing products at unbeatable prices</h3>
                <div className="link-container">
                    <Link to='/shop' className="link">Shop Now</Link>
                </div>
            </div>
            <div className="card-container">
                <div className="card">
                    <img src={fire} alt="Fire"></img>
                    <h3>Top Deals</h3>
                    <p>Grab the best offers before they're gone. Updated daily!</p>
                </div>
                <div className="card">
                    <img src={deliv} alt="Delivery"></img>
                    <h3>Free Delivery</h3>
                    <p>On all orders over 499. Fast & reliable shipping.</p>
                </div>
                <div className="card">
                    <img src={lock} alt="Lock"></img>
                    <h3>Secure Checkout</h3>
                    <p>100% safe payments with industry-grade encryption.</p>
                </div>
            </div>

        </div>
    )
}

export default Home;