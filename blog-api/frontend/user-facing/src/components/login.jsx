import { useState, useRef } from "react";

function Login(){
    const emailRef = useRef(null);
    const passwordRef = useRef(null);

    const [message, setMessage] = useState(null);



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
            }
        } catch(err){
            console.error(err);
        }
    }



    return (
        <form onSubmit={handleSubmit}>
            <h2>Login</h2>
            {message && (
                <p>{message}</p>
            )}
            <div>
                <label htmlFor="email">Email</label>
                <input type="email" name="email" id="email" required ref={emailRef} />
                <label htmlFor="password">Password</label>
                <input type="password" name="password" id="password" required ref={passwordRef} />
                <button type="submit">Login</button>
            </div>
        </form>
    )
}

export default Login;