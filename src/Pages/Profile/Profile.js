import React, { useContext, useEffect, useState } from 'react'
import "./Profile.css";
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Context/Context';
import Login from '../Login/Login';
function Profile() {
  const navigate = useNavigate();
  const { User, logout, authToken, setCurrent } = useContext(AuthContext);
  const [authenticated, setAuth] = useState();

  useEffect(() => {
    if (authToken) {
      setAuth(true)
    } else {
      setAuth(false)
    }
  }, [authToken])


  return (
    <>

      {
        authenticated ? (<div className='parent'>
          <button className='create' onClick={() => {
            setCurrent(null); 
            navigate("/write"); 
          }}
          >Create your Blog</button>

          <div className='form'>
            <h1>Profile</h1>
            <p style={{ fontSize: "25px", color: "#f5f5f5", fontFamily: "URW Chancery L, cursive" }}>Name: {User}</p>

            <button onClick={logout}>Logout</button>

          </div>

        </div>) : <Login />

      }


    </>



  )
}

export default Profile
