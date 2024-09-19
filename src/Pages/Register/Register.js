import React, { useEffect, useState } from 'react';
import "./Register.css";
import { Link } from 'react-router-dom';
import { AuthContext } from '../../Context/Context';
import { useContext } from 'react';
function Register() {
  
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const {toggle}=useContext(AuthContext);
  
 
  const handleSignup = async () => {
   
    try {
      const response = await fetch('https://django-blog-cyfp.vercel.app/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password, email }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || 'Failed to sign up');
      }

      // Handle success, maybe auto-login the user
      const data = await response.json();
      console.log('Signup successful', data);
    } catch (error) {
      console.log("ERROR",error)
    }
  }

  return (
    <div className={'parent'}>
      <div className={'form'}>
        <h1>Signup</h1>
        <input placeholder='Name' type='text' value={username} onChange={(e) => { setUsername(e.target.value) }} />
        <input placeholder='Email' type='Email' value={email} onChange={(e) => { setEmail(e.target.value) }} />
        <input placeholder='Password' type='password' value={password} onChange={(e) => { setPassword(e.target.value) }} />
       
        <button onClick={handleSignup}>Signup</button>
        <p>have an Account <Link to={"/login"} className='link'>Login</Link></p>
      </div>
      <div className="line">Terms and policy applied</div>
    </div>
  )
}

export default Register;
