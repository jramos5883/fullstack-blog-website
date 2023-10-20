"use client";

import { useState, useEffect } from "react";
import { collection, doc, getDocs } from "firebase/firestore";
import { db } from "../utils/firebase/firebase.utils";

export default function DisplayPosts() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const querySnapshot = await getDocs(collection(db, "posts"));
      const fetchPosts = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setPosts(fetchPosts);
    };
    fetchPosts();
  }, []);

  return (
    <div>
      {posts.map((post) => (
        <div key={post.id}>
          <p>{post.title}</p>
          <p>Category: {post.category}</p>
          <p>Written By: {post.author}</p>
          <p>
            Published On:{" "}
            {new Date(post.createdAt.seconds * 1000).toLocaleDateString()}
          </p>
          <p>{post.content}</p>
        </div>
      ))}
    </div>
  );
}
