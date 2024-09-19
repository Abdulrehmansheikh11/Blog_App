import React, { useContext, useEffect, useState,useRef } from 'react';
import { AuthContext } from '../../Context/Context';
import "./Home.css";
import 'animate.css';
import Login from '../Login/Login';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowRight, faStar, faUser, faSpinner, faMagnifyingGlass, faEllipsisV } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import DeleteConfirmationModal from '../../delete/Delete';
import { Menu, MenuItem, IconButton } from '@mui/material'; // Importing Material-UI components
import Pagination from '../../Pagination/Pagination';
import CardSkeleton from '../../CardSkeleton/CardSkeleton';
import { TypeAnimation } from 'react-type-animation';


function Home() {
    // state managment hooks
    const { authToken, blogs, setBlogs, setCurrent, toggle } = useContext(AuthContext);
    const [authenticated, setAuth] = useState("");
    const [serach, setSerach] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [postPerPage, setPostPerPage] = useState(3);


    //styling hooks
    const [openModal, setOpenModal] = useState(false);
    const [selectedBlogId, setSelectedBlogId] = useState(null);
    const [anchorEl, setAnchorEl] = useState(null);
    const [menuIndex, setMenuIndex] = useState(null);
    const [dubBlog, setDubBlog] = useState([])
    const [background, setBackground] = useState(0);

    const navigate = useNavigate();

    useEffect(() => { fetchBooks(); }, []);
    useEffect(() => {
        if (authToken) {
            setAuth(true);
        } else {
            setAuth(false);
        }
    }, [authToken]);
    useEffect(() => serachBlog(), [serach]);


    const images = [
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTKZxFbQRnfg2lalHl0nLNoOy9ASc1W6mp-X_-iBW6_SWzf2oDxa58q3y-7EOspX46wM1o&usqp=CAU",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQh8_j2RcY6JIAZZqYydj13ZCA40N6pdNCXDA&s",
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSA5scQDh-3l6ywdOcao4HWMz5whUfQnV6DdA&s"
    ];

    useEffect(() => {

        const intervalId = setInterval(() => {
            setBackground((background + 1) % images.length);
        }, 7000);

        // Clean up function to clear the interval when the component unmounts
        return () => clearInterval(intervalId);
    }, [background]); // Dependency array is empty, so this effect runs only once on mount

 




    const handleOpenModal = (id, index) => {
        setSelectedBlogId(id);
        setOpenModal(true);
        handleCloseMenu();
    };

    const handleCloseModal = () => {
        setOpenModal(false);
        setSelectedBlogId(null);
    };


    const fetchBooks = async () => {
        try {
            console.log(authToken);
            const response = await fetch("https://django-blog-cyfp.vercel.app/api/blogposts", {
                headers: {
                    'Authorization': `Token ${authToken}`,
                    'Content-Type': 'application/json'
                }
            });
            const data = await response.json();
            console.log('get data successful', data);

            data.sort((a, b) => a.id - b.id);

            setBlogs(data);
            setDubBlog(data);
        } catch (error) {
            console.error('Error fetching books:', error);
        }
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

    const serachBlog = () => {
        const filtered = dubBlog.filter((blog) => blog.title.toLowerCase().includes(serach.toLowerCase().trim()));
        setBlogs(filtered);
    };


    const handleMenuClick = (event, index) => {
        setAnchorEl(event.currentTarget);
        setMenuIndex(index);
    };

    const handleCloseMenu = () => {
        setAnchorEl(null);
        setMenuIndex(null);
    };




    const maxLength = 80;

    const indexoflastpage = currentPage * postPerPage; // =10
    const indexoffirstpage = indexoflastpage - postPerPage //=0
    const currentPosts = blogs.slice(indexoffirstpage, indexoflastpage);


    const paginate = (pageNumber) => setCurrentPage(pageNumber)
    return (
        <>
            {authenticated ? (
                <>

                    <section    className={toggle ? 'section1' : 'section1-dark'}   >
                        <div id={toggle ? 'banner' : 'banner-dark'} class="animate__animated animate__backInLeft animate__delay-1s " >
                            <div id='content'  class="animate__animated animate__backInRight animate__delay-2s " >
                                <div className='head'>
                                    <h4>Blogs</h4>
                                    <h4 style={{ color: "lightblue" }}>Latest</h4>
                                </div>
                                <h1>
                                    Martin Scorsese Existent that Masterpiece "<span style={{ color: "#f0f0f0" }}>The Taxi Driver</span>"
                                </h1>

                             {/*   <TypeAnimation
                                    sequence={[
                                        // Same substring at the start will only be typed out once, initially
                                        'We produce food for Mice',
                                        1000, // wait 1s before replacing "Mice" with "Hamsters"
                                        'We produce food for Hamsters',
                                        1000,
                                        'We produce food for Guinea Pigs',
                                        1000,
                                        'We produce food for Chinchillas',
                                        1000
                                    ]}
                                    wrapper="span"
                                    speed={50}
                                    style={{ fontSize: '2em', display: 'inline-block' }}
                                    repeat={Infinity}
                                /> */}
                                
                                <div className={toggle ? "category" : "category-dark"}>
                                    <button>Philosophy</button>
                                    <button>Entertainment</button>
                                    <button>Movies</button>
                                </div>
                            </div>
                        </div>
                    </section>

                    <div className={toggle ? "back" : "back-dark"}>
                        <div className={toggle ? "container" : "container-dark"}>
                            <div className="left-section" >
                                <h1 style={{ fontWeight: "bold" }}>Blogs</h1>

                                


                                <div className={toggle ? "searchs" : "searchs-dark"} >
                                    <FontAwesomeIcon icon={faMagnifyingGlass} className='sers' />
                                    <input style={{ outline: 'none' }} placeholder='Search Blog..' type='text' value={serach} onChange={(e) => setSerach(e.target.value)} />
                                </div>

                                {currentPosts && currentPosts.length > 0 ? (
                                    currentPosts.map((blog, index) => (
                                        <div key={index} className={toggle ? "blog" : "blog-dark"} >
                                            <div className='p-2'>
                                                <IconButton onClick={(e) => handleMenuClick(e, index)}>
                                                    <FontAwesomeIcon icon={faEllipsisV} className={toggle ? "dot" : "dot-dark"} />
                                                </IconButton>
                                                <Menu
                                                    anchorEl={anchorEl}
                                                    open={menuIndex === index}
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
                                                    <MenuItem onClick={() => handleUpdate(blog)}>Update</MenuItem>
                                                    {/* this is not th right way to update , you have to pass the item as a prop to update screen and plz create 
                                                     separate update and post editor screen */}
                                                    <MenuItem onClick={() => handleOpenModal(blog.id, index)}>Delete</MenuItem>
                                                </Menu>
                                            </div>
                                            <div className='p-1' onClick={() => navigate("/detail", { state: blog })}>
                                                <div className='add'>
                                                    <h3 style={{ marginTop: "1px" }}>{blog.title}</h3>
                                                    <h4 style={{ fontSize: "15px", fontFamily: "sans-serif", margin: "1px", marginBottom: "5px", padding: "1px", color: "#c0c0c0" }}>{blog.content.substring(0, maxLength).trim() + "..."}</h4>
                                                </div>

                                                <img src={blog.image} alt={blog.title} />
                                            </div>
                                            <div className={toggle ? "category" : "category-dark"}>
                                                <button>Philosophy</button>
                                                <button>Entertainment</button>
                                                <button>Movies</button>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    // <h1 style={{ fontFamily: 'sans-serif', color: "lightgray", marginTop: "10%", fontSize: "5vw" }}>BLOG</h1> 
                                    <>
                                        <CardSkeleton />
                                        <CardSkeleton />
                                        <CardSkeleton />
                                    </>

                                )}

                                { // <Pagination postperpage={postPerPage} totalposts={blogs.length} paginate={paginate}/> 
                                }
                            </div>
                            <div className="divider"></div>
                            <div className="right-section" >


                                <div className={toggle ? "search" : "search-dark"} >
                                    <FontAwesomeIcon icon={faMagnifyingGlass} className='ser' />
                                    <input style={{ outline: 'none' }} placeholder='Search Blog..' type='text' value={serach} onChange={(e) => setSerach(e.target.value)} />
                                </div>

                                <div className='sec21' style={{
                                    backgroundImage: `url(${images[background]})`,
                                    transition: 'background-image 1s',
                                }}>
                                    <h1>Become our premium member</h1>
                                    <button>Join Us</button>
                                </div>

                                <div className={toggle ? "all" : "all-dark"}>
                                    <h1>Tags</h1>
                                    <hr className='hrr' />
                                    <div className={toggle ? "cate" : "cate-dark"}>
                                        <button>Philosophy</button>
                                        <button>Entertainment</button>
                                        <button>Movies</button>
                                        <button>Hip Hop</button>
                                        <button>News</button>
                                        <button>Philosophy</button>
                                        <button>Crime</button>
                                        <button>Technology</button>
                                        <button>Travel</button>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </>
            ) : (
                <Login />
            )}
            <DeleteConfirmationModal
                open={openModal}
                handleClose={handleCloseModal}
                handleConfirm={handleConfirmDelete}
            />
        </>
    );
}

export default Home;
