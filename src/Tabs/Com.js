import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThumbsUp, faComment, faShareNodes ,faPen} from '@fortawesome/free-solid-svg-icons';
import React, { useState } from 'react';
import './Tabs.css'; // CSS for styling

const CommentSection = () => {
    const [comment, setComment] = useState('');

    const handleInputChange = (event) => {
        setComment(event.target.value);
    };

    const handlePostComment = () => {
        // Here you can handle posting the comment (e.g., sending to a server, updating state, etc.)
        console.log('Posting comment:', comment);
        // Clear input field after posting
        setComment('');
    };

    return (
        <>
           
                <h1 className='kips'> Comment <FontAwesomeIcon icon={faPen} /> </h1>

                <section >
                    <div className="comment-section">
                        <div className="profile-image">
                            {/* Replace with your profile image */}
                            <img src="https://t3.ftcdn.net/jpg/03/46/83/96/360_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg" alt="Profile" alt="Profile" />
                        </div>
                        <div className="comment-input">
                            <textarea
                                placeholder="Write a comment..."
                                value={comment}
                                onChange={handleInputChange}
                                rows={1} // Start with a single row
                                style={{ height: "auto" ,fontFamily:"sans-serif"}}
                            />
                            <button onClick={handlePostComment}>Post</button>
                        </div>
                    </div>
                </section>

            

        </>

    );
};

export default CommentSection;
