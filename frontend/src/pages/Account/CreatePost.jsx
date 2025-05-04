import React, { useState } from "react";
import { storage, db } from "../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { useStateValue } from "../Account/StateProvider";
import "./App.css";

const fetchAICaption = async (mood) => {
  const aiCaptions = {
    happy: "Today is a beautiful day! 😊",
    sad: "Feeling a little down today. 😔",
    excited: "I can't wait for the next adventure! 😁",
    chill: "Just relaxing today. 😎",
  };
  return aiCaptions[mood] || "Feeling great!";
};

const CreatePost = () => {
  const [{ user }] = useStateValue();
  const [image, setImage] = useState(null);
  const [caption, setCaption] = useState("");
  const [tags, setTags] = useState("");
  const [mood, setMood] = useState("happy");
  const [uploading, setUploading] = useState(false);

  const handleGenerateAICaption = async () => {
    const aiCaption = await fetchAICaption(mood);
    setCaption(aiCaption);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!image || !caption || !user) return alert("Missing fields");

    setUploading(true);
    const storageRef = ref(storage, `posts/${user.userName}_${Date.now()}`);
    const uploadTask = uploadBytesResumable(storageRef, image);

    uploadTask.on(
      "state_changed",
      null,
      (err) => {
        console.error(err);
        setUploading(false);
      },
      async () => {
        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
        await addDoc(collection(db, "posts"), {
          imageURL: downloadURL,
          caption,
          tags,
          mood,
          userName: user.userName,
          photoURL: user.photoURL,
          timeStamp: serverTimestamp(),
        });
        setImage(null);
        setCaption("");
        setTags("");
        setUploading(false);
      }
    );
  };

  return (
    <form className="create-post-form" onSubmit={handleSubmit}>
      <h3>Create a Post</h3>

      <input type="file" onChange={(e) => setImage(e.target.files[0])} />
      <textarea value={caption} onChange={(e) => setCaption(e.target.value)} placeholder="Caption" />
      <input type="text" value={tags} onChange={(e) => setTags(e.target.value)} placeholder="Tag users" />
      <select value={mood} onChange={(e) => setMood(e.target.value)} className="option">
        <option value="happy" className="caption">Happy</option>
        <option value="sad" className="caption">Sad</option>
        <option value="excited" className="caption">Excited</option>
        <option value="chill" className="caption">Chill</option>
      </select>
      <button type="button" onClick={handleGenerateAICaption}>Generate AI Caption</button>
      <button type="submit" disabled={uploading}>{uploading ? "Posting..." : "Post"}</button>
    </form>
  );
};

export default CreatePost;



