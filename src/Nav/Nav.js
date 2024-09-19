import React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import "./Nav.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight, faStar, faMoon, faPenNib, faSun, faBars, faX } from '@fortawesome/free-solid-svg-icons';
import { AuthContext } from '../Context/Context';
import { useContext } from 'react';

const Nav = () => {
  const { authToken, blogs, setBlogs, currentbook, setCurrent, User, theme, toggle } = useContext(AuthContext);


  const [mobile, SetMobile] = useState(false)

  const handleToggleClick = (event) => {
    event.stopPropagation();
    theme();
  };

  return (
    <>
      <div className='pos'>
        <nav className={"navbar"}>
          <h1 style={{ color: "#f0f0f0" }}>blog <FontAwesomeIcon icon={faPenNib} /></h1>

          <ul className={`nav-list ${mobile ? "mobile-menu" : ""}`} onClick={() => SetMobile(false)}>
            <li className="nav-item">
              <Link to="/" className="nav-link">Home</Link>
            </li>
            <li className="nav-item">
              <Link to="/login" className="nav-link">Login</Link>
            </li>
            <li className="nav-item">
              <Link to="/Register" className="nav-link">Register</Link>
            </li>
            <li className="nav-item">
              <Link to="/profile" className="nav-link">Profile</Link>
            </li>

            <li className="nav-item">
              <Link to="/profile" className="nav-link">Theme</Link>
            </li>

              <li className='modes' style={{ color: "#f0f0f0" }} onClick={handleToggleClick}>
                {toggle ? <FontAwesomeIcon icon={faMoon} className='last' /> : <FontAwesomeIcon icon={faSun} className='last' />}
              </li>
          

          </ul>

          <h1 className='mode' style={{ color: "#f0f0f0" }} onClick={theme}>{toggle ? <FontAwesomeIcon icon={faMoon} /> : <FontAwesomeIcon icon={faSun} />}</h1>

          <button className="mbl-menu-icon" onClick={() => SetMobile(!mobile)}>
            {mobile ? <FontAwesomeIcon icon={faX} /> : <FontAwesomeIcon icon={faBars} />}
          </button>

        </nav>
      </div>

    </>

  );
};

export default Nav;
