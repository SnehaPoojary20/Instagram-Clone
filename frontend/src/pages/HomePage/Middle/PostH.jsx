import React from 'react';
import './PostH.css';

const Post = ({ profilePic, username, postImage, time }) => {
  return (
    <div className="post">
      {/* Post Header */}
      <div className="postHeader">
        <img src={profilePic} alt="profile" className="avatar" />
        <div className="postUser">
          <span className="username">{username}</span>
          <span className="time">{time}</span>
        </div>
      </div>

      {/* Post Image */}
      <img src={postImage} alt="post" className="postImage" />

      {/* Post Actions */}
      <div className="postActions">
        <span>❤️</span>
        <span>💬</span>
        <span>📤</span>
      </div>
    </div>
  );
};

export default Post;
