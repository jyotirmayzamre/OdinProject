import { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";

function Login(){
    const emailRef = useRef(null);
    const passwordRef = useRef(null);

    const [message, setMessage] = useState(null);
    const navigate = useNavigate();



    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = {
            email: emailRef.current.value,
            password: passwordRef.current.value
        }

        try {
            const response = await fetch('http://localhost:3000/auth/login', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(formData)
            });

            const data = await response.json();

            if(!response.ok){
                setMessage(data.error);
            } else {
                setMessage(null);
                emailRef.current.value = '';
                passwordRef.current.value = '';
                localStorage.setItem('token', data.token);
                navigate('/posts');
            }
        } catch(err){
            console.error(err);
        }
    }



    return (
            <main>
                <div className="info">
                    <h2>Login</h2>
                    <p>Access your account and engage in discussions!</p>
                </div>
                {message && (
                    <div className="errors-container">
                        <p className="error-message">{message}</p>
                    </div>
                )}
                <form onSubmit={handleSubmit}>
                    <div className="container">
                        <div className="field">
                            <label htmlFor="email">Email*</label>
                            <input type="email" name="email" id="email" required ref={emailRef} />
                        </div>
                        <div className="field">
                            <label htmlFor="password">Password*</label>
                            <input type="password" name="password" id="password" required ref={passwordRef} />
                        </div>
                        <div className="btn-container">
                            <button className="btn" type="submit">Login</button>
                        </div>
                        <p>Don't have an account yet? <Link to='/auth/register'>Sign Up</Link></p>
                    </div>
                </form>
            </main>
        
    )
}

export default Login;