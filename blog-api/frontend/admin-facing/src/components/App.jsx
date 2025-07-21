import { Link } from 'react-router-dom';
import '../../../user-facing/src/styles/app.css';
import Navbar from "./landing/navbar";

function App(){
  return(
    <>
      <Navbar />
      <main>
        <div className="hero">
          <div className="content">
            <h1>Welcome to ZamreDevs</h1>
            <p>Hi there! This is the admin site for my blog platform. Admins can edit existing blogs, create new posts, and manage comments on this site! Please login to continue</p>
            <div className="links">
              <Link className='btn link' to='/auth/login'>Login!</Link>
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