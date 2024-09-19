import React, { useState, useContext } from 'react';
import "./Login.css";
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Context/Context';

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('https://django-blog-cyfp.vercel.app/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      console.log("login successfully", data);
      setUsername("");
      setPassword("");
      login(data.token ,username);
      // navigate("/profile");
    } catch (error) {
      console.error('Error logging in:', error);
    }
  };

 

  return (
    <div>
      <div className='parent'>
        <div className='form'>
          <h1 >Login</h1>
          <input placeholder='username' type='text' value={username} onChange={(e) => setUsername(e.target.value)} />
          <input placeholder='Password' type='password' value={password} onChange={(e) => setPassword(e.target.value)} />
          <button onClick={handleLogin}>Login</button>
          <p>Create Account <Link to={"/Register"} className='link'>Signup</Link></p>
        </div>
        <div className="line">Terms and policy applied</div>
      </div>
    </div>
  );
}

export default Login;
