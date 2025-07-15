import { Link } from "react-router-dom";
import './styles/app.css';


function App(){
  return (
    <>
      <header>
        <div className="logo">
          <img src="/programming.png" style={{ height: '50px' }}></img>
          <h1>ZamreDevs</h1>
        </div>
        <nav>
          <Link className='link' to='/'>Home Page</Link>
          <Link className='link' to='/about'>About Me</Link>
          <Link className='link' to='/auth/login'>Login</Link>
          <Link className='link btn' to='/auth/register'>Register</Link>
        </nav>
      </header>
      <main>
        <div className="hero">
          <div className="content">
            <h1>Welcome to ZamreDevs</h1>
            <p>Hi there! My name is Jyotirmay Zamre, and this is a blog platform started by me for aspiring web developers to write blogs, comment, and learn together! Feel free to sign up as a viewer or as a writer</p>
            <div className="links">
              <Link className='btn link' to='/auth/register'>Sign up now!</Link>
              <Link className='link' to='/about'>Read about me</Link>
            </div>
          </div>
          <div className="image">
            <img src="/hero.jpg"></img>
          </div>
        </div>
      </main>
      <footer>
        <p>made by Jyotirmay Zamre</p>
      </footer>
    
    
    
    </>
  )
}

export default App;