"use client";

import { useState, useEffect } from "react";
import { db } from "../utils/firebase/firebase.utils";
import {
  collection,
  addDoc,
  query,
  where,
  orderBy,
  getDocs,
} from "firebase/firestore";

export default function Comments({ postId, currentUser }) {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");

  useEffect(() => {
    const fetchComments = async () => {
      const q = query(
        collection(db, "comments"),
        where("postId", "==", postId),
        orderBy("createdAt")
      );
      const querySnapshot = await getDocs(q);
      const commentsData = querySnapshot.docs.map((doc) => doc.data());
      setComments(commentsData);
    };

    fetchComments();
  }, [postId]);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    try {
      await addDoc(collection(db, "comments"), {
        postId,
        userId: currentUser.uid,
        comment: newComment,
        createdAt: new Date(),
      });
      setNewComment("");
      // Optionally re-fetch comments here
    } catch (error) {
      console.error("Error adding comment: ", error);
    }
  };

  if (!currentUser) {
    return <p>Please sign in to comment.</p>;
  }

  return (
    <div>
      <form onSubmit={handleCommentSubmit}>
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />
        <button type="submit">Submit Comment</button>
      </form>
      <div>
        {comments.map((comment, index) => (
          <div key={index}>
            <p>{comment.comment}</p>
            {/* Display user info, timestamp, etc. */}
          </div>
        ))}
      </div>
    </div>
  );
}
