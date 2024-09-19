import React, { useContext, useState, useEffect } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight, faStar, faUser, faSpinner, faMagnifyingGlass, faEllipsisV } from '@fortawesome/free-solid-svg-icons';
import { AuthContext } from '../../Context/Context';
import "./Edit.css";
import { useNavigate } from 'react-router-dom';
function Blog() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectImg, setselectImg]=useState(null);
  const [loader, setLoader] = useState(false);
  const [id, setId] = useState();
  const { authToken, currentbook, toggle, setBlogs, blogs } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (currentbook) {
      setTitle(currentbook.title);
      setContent(currentbook.content);
      setSelectedImage(currentbook.image);
      setselectImg(currentbook.image);
      setId(currentbook.id)
    }
  }, [currentbook]);







  const handleImageChange = (e) => {
    const file = e.target.files[0];

    setSelectedImage(file);

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setselectImg(reader.result);
      };
      reader.readAsDataURL(file);
    }
    
  };


  const postBlog = async () => {
    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', content);
    if (selectedImage) {
      formData.append('image', selectedImage);
    }
    setLoader(true);
    try {
      const response = await fetch('https://django-blog-cyfp.vercel.app/api/blogposts', {
        method: 'POST',
        headers: {
          'Authorization': `Token ${authToken}`,
        },
        body: formData,
      });

      if (response.ok) {
        const result = await response.json();
        console.log('Success:', result);
        setBlogs([...blogs, result])
        setLoader(false);
        navigate("/");

      } else {
        const errorData = await response.json();
        console.error('Error:', errorData);
        setLoader(false);
      }
    } catch (error) {
      console.error('Error:', error.message);
    }
  };

  const updateBlog = async () => {
    const formData = new FormData();
    formData.append('title', title);
   formData.append('content', content);

    // Check if selectedImage is a file (meaning it's updated) or not
    if (selectedImage instanceof File) {
      formData.append('image', selectedImage);
    } else if (currentbook && currentbook.image instanceof File) {
      formData.append('image', currentbook.image);
    }

    setLoader(true);
    try {
      const response = await fetch(`https://django-blog-cyfp.vercel.app/api/blogposts/${currentbook.id}`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Token ${authToken}`,
        },
        body: formData,
      });

      if (response.ok) {
        const updatedBlog = await response.json();
        console.log('Success:', updatedBlog);
        setLoader(false);
        navigate("/");
        setBlogs(blogs.map((blog) => blog.id === updatedBlog.id ? updatedBlog : blog));
      } else {
        const errorData = await response.json();
        console.error('Error:', errorData);
      }
    } catch (error) {
      console.error('Error:', error.message);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (currentbook) {
      updateBlog();
    } else {
      postBlog();
    }
  };


  return (
    <div class={toggle ? "forms" : "forms-dark"}  >
      <div className='boxy'>
        <h1 style={{ fontFamily: 'sans-serif' }}>Write Blog</h1>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '20px' }}>
            <label htmlFor="title" style={{ display: 'block', marginBottom: '5px' }}>Post Title</label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className='inp'
            />
          </div>
          <div style={{ marginBottom: '20px' }}>
            <label htmlFor="content" style={{ display: 'block', marginBottom: '5px' }}>Post Content</label>
            <textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
              className='contt'
              style={{backgroundColor:"white"}}
            ></textarea>

          </div>
          <div style={{ marginBottom: '20px' }}>
            <label>Image:</label>
            <input type="file" onChange={handleImageChange} />
            {selectedImage && (
              <img src={selectImg} alt="Selected" style={{ maxWidth: '100px' }} />
            )}
          </div>
          {
            loader ? (<button type="submit" style={{ padding: '10px 20px', fontSize: '16px', marginTop: '4%' }}><FontAwesomeIcon icon={faSpinner} spin /></button>) :
              (<button type="submit" style={{ padding: '10px 20px', fontSize: '16px', marginTop: '4%' }}>Post Blog</button>)
          }

        </form>
      </div>
    </div>

  );
}

export default Blog;
