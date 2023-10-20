"use client";

import { useState, useEffect } from "react";
import {
  collection,
  doc,
  getDocs,
  query,
  where,
  orderBy,
} from "firebase/firestore";
import { db } from "../utils/firebase/firebase.utils";

export default function DisplayPosts() {
  const [posts, setPosts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    const fetchPosts = async () => {
      let postsQuery = collection(db, "posts");
      if (selectedCategory) {
        postsQuery = query(
          postsQuery,
          where("category", "==", selectedCategory)
        );
      }
      postsQuery = query(postsQuery, orderBy("createdAt", "desc"));
      const querySnapshot = await getDocs(postsQuery);
      const fetchPosts = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setPosts(fetchPosts);
    };
    fetchPosts();
  }, [selectedCategory]);

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  return (
    <div className="flex items-center justify-center">
      <div className="w-2/3">
        <div>
          <label htmlFor="category">Filter by category:</label>
          <select
            id="category"
            name="category"
            value={selectedCategory}
            onChange={handleCategoryChange}
          >
            <option value="">All</option>
            <option value="Tech">Tech</option>
            <option value="Gaming">Gaming</option>
          </select>
        </div>
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
    </div>
  );
}
