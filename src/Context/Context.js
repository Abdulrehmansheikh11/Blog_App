// Context/Context.js
import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authToken, setAuthToken] = useState(localStorage.getItem('authToken'));
  const [blogs, setBlogs] = useState([]);
  const [currentbook, setCurrent] = useState(null)
  const [User, SetCurrentUser] = useState(JSON.parse(localStorage.getItem("user")));
  const [toggle, setToggle] = useState(() => window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches);
  

  
  const theme = () => {
    setToggle(!toggle);
  };


  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: light)');

    const handleChange = (e) => {
      setToggle(e.matches);
    };

    mediaQuery.addListener(handleChange); // Listen for changes in system color scheme
    return () => mediaQuery.removeListener(handleChange); // Cleanup listener on unmount
  }, []);

    
  /* useEffect(() => {
    // Check if user has a preference saved in localStorage
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setToggle(savedTheme === 'dark'); // Set toggle based on stored preference
    } else {
      // Otherwise, use prefers-color-scheme media query
      setToggle(window.matchMedia('(prefers-color-scheme: dark)').matches);
    }
  }, []);

  // Function to toggle theme
  const theme = () => {
    const newToggle = !toggle;
    setToggle(newToggle);
    localStorage.setItem('theme', newToggle ? 'dark' : 'light'); // Save preference to localStorage
  };
*/


  const login = (token, user) => {
    setAuthToken(token);
    localStorage.setItem('authToken', token);
    localStorage.setItem('user', JSON.stringify(user));
  };


  const logout = () => {
    setAuthToken(null);
    localStorage.removeItem('authToken');
  };
  console.log(User);


  return (
    <AuthContext.Provider value={{  authToken, login, logout,toggle, theme, User, blogs, setBlogs, currentbook, setCurrent, SetCurrentUser }}>
      {children}
    </AuthContext.Provider>
  );
};

