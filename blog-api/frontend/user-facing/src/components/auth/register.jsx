import { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";

function Register(){

    const emailRef = useRef(null);
    const passwordRef= useRef(null);
    const confPasswordRef = useRef(null)
    const [errors, setErrors] = useState([]);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = {
            email: emailRef.current.value,
            password: passwordRef.current.value,
            confirm_password: confPasswordRef.current.value
        }

        try {
            const response = await fetch('http://localhost:3000/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json'},
                body: JSON.stringify(formData)
            })

            const data = await response.json();

            if(!response.ok){
                const errorsList = data.errors.map((err) => {return err.msg});
                setErrors(errorsList);
            } else {
                setErrors([]);
                emailRef.current.value = '';
                passwordRef.current.value = '';
                confPasswordRef.current.value = '';
                navigate('/auth/login');
            }
        } catch(err){
            console.error(err);
        }
    }

    return (
        <main>
            <div className="info">
                <h2>Sign Up</h2>
                <p>and participate in the journey with the community!</p>
            </div>
            {errors.length > 0 && (
                    <div className="error">
                        <ul>
                            {errors.map((err, idx) => (
                                <li key={idx}>{err}</li>
                            ))}
                        </ul>
                    </div>
                )}
            <form onSubmit={handleSubmit}>
                <div className="container">
                    <div className="field">
                        <label htmlFor="email">Email</label>
                        <input type="email" id="email" name="email" required ref={emailRef}/>
                    </div>
                    <div className="field">
                        <label htmlFor="password">Password</label>
                        <input type="password" id="password" name="password" minLength={3} ref={passwordRef} />
                    </div>
                    <div className="field">
                        <label htmlFor="confirm_password">Confirm Password</label>
                        <input type="password" id="confirm_password" name="confirm_password" minLength={3} required ref={confPasswordRef} />
                    </div>
                    <div className="btn-container">
                        <button type="submit" className="btn">Sign Up</button>
                    </div>   
                    <p>Already have an account? <Link to='/auth/login'>Sign In</Link></p>
                </div>
            </form>
        </main>
    )
}

export default Register;