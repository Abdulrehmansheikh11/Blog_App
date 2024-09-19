// App.js
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Nav from './Nav/Nav';
import { AuthProvider } from './Context/Context'; // Adjust the path as per your project structure
import Login from './Pages/Login/Login'; // Adjust paths for other components accordingly
import Register from './Pages/Register/Register';
import Profile from './Pages/Profile/Profile';
import Home from './Pages/Home/Home';
import Blog from './Pages/Edit/Edit';
import BlogDetail from './Pages/BlogDetail/BlogDetail';

function App() {
  return (
    <AuthProvider>
      <Nav />
      <Routes>
      <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/write' element={<Blog />} />
        <Route path='/detail' element={<BlogDetail/>}/>
      </Routes>
    </AuthProvider>
  );
}


export default App;
