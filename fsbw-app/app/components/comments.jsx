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
  doc as getDocRef,
  getDoc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import Avatar from "@mui/material/Avatar";
import ConfirmationDialog from "./ConfirmationDialog"; // Adjust the import path as needed

export default function Comments({ postId, currentUser }) {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [editedComment, setEditedComment] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [commentToDelete, setCommentToDelete] = useState(null);

  useEffect(() => {
    const fetchComments = async () => {
      const q = query(
        collection(db, "comments"),
        where("postId", "==", postId),
        orderBy("createdAt")
      );
      const querySnapshot = await getDocs(q);
      const commentsData = await Promise.all(
        querySnapshot.docs.map(async (docSnapshot) => {
          const commentData = docSnapshot.data();
          const userDocRef = getDocRef(db, "users", commentData.userId);
          const userDoc = await getDoc(userDocRef);
          const userData = userDoc.data() || {};
          return {
            id: docSnapshot.id,
            ...commentData,
            userDisplayName: userData.displayName || "Anonymous",
            userPhotoURL: userData.photoURL || "/path-to-default-avatar.jpg",
          };
        })
      );
      setComments(commentsData);
    };

    fetchComments();
  }, [postId]);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    try {
      const newCommentRef = await addDoc(collection(db, "comments"), {
        postId,
        userId: currentUser.uid,
        comment: newComment,
        createdAt: new Date(),
      });

      const newCommentForDisplay = {
        id: newCommentRef.id,
        userId: currentUser.uid,
        comment: newComment,
        createdAt: new Date(),
        userDisplayName: currentUser.displayName || "Anonymous",
        userPhotoURL: currentUser.photoURL || "/path-to-default-avatar.jpg",
      };

      setComments([...comments, newCommentForDisplay]);
      setNewComment("");
    } catch (error) {
      console.error("Error adding comment: ", error);
    }
  };

  const startEdit = (commentId, commentText) => {
    setEditingCommentId(commentId);
    setEditedComment(commentText);
  };

  const cancelEdit = () => {
    setEditingCommentId(null);
    setEditedComment("");
  };

  const handleEditSubmit = async (commentId) => {
    if (!editedComment.trim()) return;

    try {
      const commentDocRef = getDocRef(db, "comments", commentId);
      await updateDoc(commentDocRef, { comment: editedComment });
      setComments(
        comments.map((comment) =>
          comment.id === commentId
            ? { ...comment, comment: editedComment }
            : comment
        )
      );
      cancelEdit();
    } catch (error) {
      console.error("Error updating comment: ", error);
    }
  };

  const promptDelete = (commentId) => {
    setIsDialogOpen(true);
    setCommentToDelete(commentId);
  };

  const handleDeleteConfirm = async () => {
    try {
      const commentDocRef = getDocRef(db, "comments", commentToDelete);
      await deleteDoc(commentDocRef);
      setComments(comments.filter((comment) => comment.id !== commentToDelete));
      setIsDialogOpen(false);
      setCommentToDelete(null);
    } catch (error) {
      console.error("Error deleting comment: ", error);
    }
  };

  return (
    <div>
      {currentUser && (
        <form onSubmit={handleCommentSubmit}>
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          />
          <button type="submit">Submit Comment</button>
        </form>
      )}

      <div>
        {comments.map((comment) => (
          <div key={comment.id} className="flex items-center space-x-2">
            <Avatar alt={comment.userDisplayName} src={comment.userPhotoURL} />
            <div>
              {editingCommentId === comment.id ? (
                <>
                  <textarea
                    value={editedComment}
                    onChange={(e) => setEditedComment(e.target.value)}
                  />
                  <button onClick={() => handleEditSubmit(comment.id)}>
                    Save
                  </button>
                  <button onClick={cancelEdit}>Cancel</button>
                </>
              ) : (
                <>
                  <p>
                    <strong>{comment.userDisplayName}:</strong>{" "}
                    {comment.comment}
                  </p>
                  {currentUser && currentUser.uid === comment.userId && (
                    <div>
                      <button
                        onClick={() => startEdit(comment.id, comment.comment)}
                      >
                        Edit
                      </button>
                      <button onClick={() => promptDelete(comment.id)}>
                        Delete
                      </button>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        ))}
      </div>

      <ConfirmationDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onConfirm={handleDeleteConfirm}
        message="Are you sure you want to remove your comment?"
      />

      {!currentUser && <p className="">Sign in to post a comment.</p>}
    </div>
  );
}
