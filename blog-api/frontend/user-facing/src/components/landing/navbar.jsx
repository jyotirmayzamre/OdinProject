import { Link } from "react-router-dom"
import '../../styles/navbar.css'

function Navbar(){
    return (
        <header>
            <div className="logo">
            <img src="/programming.png" style={{ height: '50px' }}></img>
            <h2>ZamreDevs</h2>
            </div>
            <nav>
            <Link className='link' to='/'>Home Page</Link>
            <Link className='link' to='/about'>About Me</Link>
            <Link className='link' to='/auth/login'>Login</Link>
            <Link className='link btn' to='/auth/register'>Register</Link>
            <Link className="link" to='/posts'>Posts</Link>
            </nav>
        </header>
    )
}

export default Navbar;