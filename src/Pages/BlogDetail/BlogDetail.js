import React from 'react';
import { useState } from 'react';
import "./BlogDetail.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import DeleteConfirmationModal from '../../delete/Delete';
import { faArrowLeft, faArrowRight, faStar, faEllipsisV } from '@fortawesome/free-solid-svg-icons';
import { Menu, MenuItem, IconButton } from '@mui/material';
import { useLocation } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../../Context/Context';
import { useNavigate } from 'react-router-dom';
import BottomNav from '../../BottomNav/BottomNav';
import CustomTabs from '../../Tabs/Tabs';

function BlogDetail() {
  const { state } = useLocation();
  const { setCurrent, toggle, authToken, setBlogs } = useContext(AuthContext);
  const [openModal, setOpenModal] = useState(false);
  const [selectedBlogId, setSelectedBlogId] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();
  const publishedDate = state.published_date.slice(0, 10);

  const handleOpenModal = (id) => {
    setSelectedBlogId(id);
    setOpenModal(true);
    handleCloseMenu();
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedBlogId(null);
  };

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleConfirmDelete = async () => {
    try {
      const response = await fetch(`https://django-blog-cyfp.vercel.app/api/blogposts/${selectedBlogId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Token ${authToken}`,
        },
      });

      if (response.ok) {
        // Remove the deleted blog from the state
        setBlogs(prevBlogs => prevBlogs.filter(blog => blog.id !== selectedBlogId));
        console.log('Success: Blog deleted');
        navigate("/");
      } else {
        const errorData = await response.json();
        console.error('Error:', errorData);
      }
    } catch (error) {
      console.error('Error:', error.message);
    }
    handleCloseModal();
  };

  const handleUpdate = (blog) => {
    setCurrent(blog);
    navigate('/write');
    handleCloseMenu();
  };

  return (
    <>
      <div className={toggle ? "page" : "page-dark"}>
        <div className='clip'>
          <h3>Date: {publishedDate}</h3>
          <div className='p-2'>
            <IconButton onClick={handleMenuClick}>
              <FontAwesomeIcon icon={faEllipsisV} className={toggle ? "dot" : "dot-dark"} />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleCloseMenu}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
            >
              <MenuItem onClick={() => handleUpdate(state)}>Update</MenuItem>
              <MenuItem onClick={() => handleOpenModal(state.id)}>Delete</MenuItem>
            </Menu>
          </div>
        </div>
        <section className='det1'>
          <h1>{state.title}</h1>
          <div className='d1'>
            <img src={state.image} alt={state.title} />
          </div>
          <div className={toggle?'cont':"cont-dark"}>
            <h3>{state.content}</h3>
          </div>
        </section>
      
       <CustomTabs/>
        <BottomNav/>
        <br/>
        <br/>
        <br/>
        <br/>
        <br/>
      </div>


      <DeleteConfirmationModal
        open={openModal}
        handleClose={handleCloseModal}
        handleConfirm={handleConfirmDelete}
      />


    </>
  );
}

export default BlogDetail;

