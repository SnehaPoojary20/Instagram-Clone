import {
  addDoc,
  collection,
  doc,
  getDoc,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { auth, db } from "../firebase";
import { useStateValue } from "./StateProvider";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

function Post({ userName, photoURL, caption, imageURL, postID }) {
  const [moreButton, setMoreButton] = useState(false);
  const [{ user }] = useStateValue();
  const [likesOnPost, setLikesOnPost] = useState({ likes: [] });
  const [commentsOnPost, setCommentsOnPost] = useState([]);
  const [commentInput, setCommentInput] = useState("");
  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    const unsub = onSnapshot(doc(db, "likes", postID), (docSnap) => {
      if (docSnap.exists()) {
        setLikesOnPost(docSnap.data());
      }
    });
    return () => unsub();
  }, [postID]);

  const handleLike = async () => {
    const updatedLikes = likesOnPost.likes.includes(user.userName)
      ? likesOnPost.likes.filter((u) => u !== user.userName)
      : [...likesOnPost.likes, user.userName];

    await setDoc(doc(db, "likes", postID), { likes: updatedLikes });
  };

  useEffect(() => {
    const q = query(
      collection(db, "comments", postID, "list"),
      orderBy("timeStamp", "desc")
    );
    const unsub = onSnapshot(q, (snapshot) => {
      setCommentsOnPost(snapshot.docs);
    });
    return () => unsub();
  }, [postID]);

  const handleComment = async (e) => {
    e.preventDefault();
    if (commentInput.trim()) {
      await addDoc(collection(db, "comments", postID, "list"), {
        commentInput,
        userName: user.userName,
        photoURL: user.photoURL,
        timeStamp: serverTimestamp(),
      });
      setCommentInput("");
    }
  };

  const likeActive = likesOnPost.likes.includes(user.userName);

  return (
    <Container>
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="md" fullWidth>
        <DialogTitle>Comments</DialogTitle>
        <DialogContent>
          <AllCommentContainer>
            {commentsOnPost.map((comment) => (
              <div className="post-comment" key={comment.id}>
                <div className="user-image">
                  <img src={comment.data().photoURL} alt="" />
                </div>
                <div className="user-comment">
                  <strong>{comment.data().userName}</strong>
                  <p>{comment.data().commentInput}</p>
                </div>
              </div>
            ))}
          </AllCommentContainer>
        </DialogContent>
      </Dialog>

      <UserInfo>
        <img src={photoURL} alt="" />
        <p>{userName}</p>
      </UserInfo>

      <Content>
        <img src={imageURL} alt="" />
      </Content>

      <PostCTA>
        <CTAButtons>
          <img
            src={likeActive ? "./heart (1).png" : "./heart.png"}
            alt=""
            onClick={handleLike}
          />
          <img src="./chat 1.png" alt="" onClick={() => setOpenDialog(true)} />
        </CTAButtons>

        <LikeCount>
          <p>{likesOnPost.likes.length} likes</p>
        </LikeCount>

        <PostDescription moreButton={moreButton}>
          <h5>{caption}</h5>
          {commentsOnPost[0] && (
            <div className="recent-comment">
              <strong>{commentsOnPost[0].data().userName}</strong>
              <p>{commentsOnPost[0].data().commentInput}</p>
            </div>
          )}
          <div className="description-buttons">
            <p onClick={() => setOpenDialog(true)}>view all comments</p>
            <p onClick={() => setMoreButton(!moreButton)}>{moreButton ? "less" : "more"}</p>
          </div>
        </PostDescription>

        <CommentInput>
          <input
            type="text"
            placeholder="Add Comment"
            value={commentInput}
            onChange={(e) => setCommentInput(e.target.value)}
          />
          <button onClick={handleComment}>Post</button>
        </CommentInput>
      </PostCTA>
    </Container>
  );
}

export default Post;

// Style components like Container, UserInfo, etc., remain as per your CSS or styled-components
