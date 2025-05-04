import React, { useState } from "react";
import Captions from "../Account/Captions.json"; 
import './CreatePostForm.css';


function CreatePostForm({ onPostSubmit }) {
  const [image, setImage] = useState(null);
  const [caption, setCaption] = useState("");
  const [taggedUsers, setTaggedUsers] = useState("");
  const [mood, setMood] = useState("Happy");
  const [availableCaptions, setAvailableCaptions] = useState([]);

  const handleMoodChange = (e) => {
    const selectedMood = e.target.value;
    setMood(selectedMood);
    setAvailableCaptions(Captions[selectedMood] || []);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const postData = {
      image,
      caption,
      taggedUsers,
      mood,
    };
    onPostSubmit(postData);
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* <h2>Create a New Post</h2> */}

      <div>
        <label><b>Upload Image:</b></label>
        <input type="file" onChange={(e) => setImage(e.target.files[0])} className="input" />
      </div>

      <div>
        <label><b>Caption:</b></label>
        <textarea
          placeholder="Write a caption..."
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
          className="caption" />
      </div>

      <div>
        <label><b>Tag Users:</b></label>
        <input
          type="text"
          placeholder="Tag users by @username"
          value={taggedUsers}
          onChange={(e) => setTaggedUsers(e.target.value)}
        className="tag"/>
      </div>

      <div>
        <label className="moods"><b>Mood:</b></label>
        <select value={mood} onChange={handleMoodChange}>
          {Object.keys(Captions).map((moodOption) => (
            <option key={moodOption} value={moodOption} >
              {moodOption}
            </option>
          ))}
        </select>
      </div>

     
      {availableCaptions.length > 0 && (
        <div style={{ marginTop: "10px" }}>
          <p>Available Captions for <strong>{mood}</strong>:</p>
          <ul>
            {availableCaptions.map((cap, index) => (
              <li key={index}>{cap}</li>
            ))}
          </ul>
        </div>
      )}

      <div style={{ marginTop: "10px" }}>
        <button type="button" onClick={() => setCaption(availableCaptions[0] || "")} className="result">
          Get AI-Generated Caption
        </button>
        <button type="submit" className="post">Post</button>
      </div>
    </form>
  );
}

export default CreatePostForm;
