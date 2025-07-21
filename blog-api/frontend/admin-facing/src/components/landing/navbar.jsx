import { Link } from 'react-router-dom';
import '../../../../user-facing/src/styles/navbar.css';

function Navbar(){
    return (
        <header>
            <div className="logo">
            <img src="/programming.png" style={{ height: '50px' }}></img>
            <h2>ZamreDevs</h2>
            </div>
            <nav>
                <Link className='link' to='/'>Home Page</Link>
                <Link className='link' to='/auth/login'>Login</Link>
                <Link className='link' to='/posts'>Posts</Link>
                <Link className="link" to='/posts/create'>Create new post</Link>
            </nav>
        </header>
    )
}

export default Navbar;