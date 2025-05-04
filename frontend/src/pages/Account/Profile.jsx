import React, { useEffect, useState } from "react";
import { useStateValue } from "../Account/StateProvider.jsx";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase.js";
import Post from "./Post.jsx";
import LeftSide from "../HomePage/Left/Left.jsx";
import CreatePostForm from "./CreatePostForm.jsx";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import Button from "@mui/material/Button";
import "./Profile.css";


function Profile() {
  const [{ user }] = useStateValue();
  const [allPost, setAllPost] = useState([]);
  const [openCreateDialog, setOpenCreateDialog] = useState(false);
  const [wallpaper, setWallpaper] = useState(""); // State to hold the wallpaper URL

  useEffect(() => {
    const fetchPosts = async () => {
      if (!user?.userName) return;
      const q = query(collection(db, "posts"), where("userName", "==", user.userName));
      const querySnapshot = await getDocs(q);
      setAllPost(querySnapshot.docs);
    };

    fetchPosts();
  }, [user?.userName]);

  const handlePostSubmit = async (postData) => {
    console.log("New post submitted:", postData);
    setOpenCreateDialog(false);
  };

  const handleWallpaperChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setWallpaper(reader.result); // Set wallpaper to the selected image
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="profile-container" style={{ display: "flex" }}>
      <LeftSide />

      <main
        className="profile-main"
        style={{
          flex: 1,
          padding: "20px",
          overflowY: "auto",
          backgroundImage: wallpaper ? `url(${wallpaper})` : "none", // Set background image
          backgroundSize: "cover",
          backgroundPosition: "center",
          transition: "background-image 0.3s ease-in-out", // Smooth transition
        }}
      >
        <div className="profile-user-info" style={{ marginBottom: "30px" }}>
          <h2 style={{ color: "white", marginTop: "10px" }}>{user?.userName}</h2>
          <Button
            variant="contained"
            color="primary"
            style={{ marginTop: "10px" }}
            onClick={() => setOpenCreateDialog(true)}
          >
            Create Post
          </Button>

          <div className="background">
            <input
              type="file"
              accept="image/*"
              onChange={handleWallpaperChange}
              style={{ marginTop: "20px", color: "white" }}
            />
            <p style={{ color: "white", fontSize: "12px" }}>
              Choose a background image
            </p>
          </div>
        </div>

        {allPost.length === 0 ? (
          <p style={{ color: "gray" }}>No posts yet.</p>
        ) : (
          <div className="profile-post-container">
            {allPost.map((post) => (
              <Post
                key={post.id}
                postID={post.id}
                userName={post.data().userName}
                photoURL={post.data().photoURL}
                caption={post.data().caption}
                imageURL={post.data().imageURL}
              />
            ))}
          </div>
        )}
      </main>

      <Dialog open={openCreateDialog} onClose={() => setOpenCreateDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Create New Post</DialogTitle>
        <DialogContent>
          <CreatePostForm onPostSubmit={handlePostSubmit} />
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default Profile;



