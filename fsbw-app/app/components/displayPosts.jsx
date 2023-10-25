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
    <div className="flex items-center justify-center bg-slate-500">
      <div className="w-2/3 mt-4">
        <div>
          <h1 className="flex justify-center">Tech and Gaming Fanatics</h1>
          <p className="flex justify-center italic text-xl">
            -For those who love great games and new technologies!
          </p>
          <label className="text-lg" htmlFor="category">
            Filter by category:{" "}
          </label>
          <select
            className="text-xl bg-gray-500 border-2 border-black"
            id="category"
            name="category"
            value={selectedCategory}
            onChange={handleCategoryChange}
            // style={{ backgroundColor: "lightgray" }}
          >
            <option className="text-xl" value="">
              All
            </option>
            <option className="text-xl" value="Tech">
              Tech
            </option>
            <option className="text-xl" value="Gaming">
              Gaming
            </option>
          </select>
        </div>
        {posts.map((post) => (
          <div key={post.id}>
            <p className="text-2xl">{post.title}</p>
            <p className="text-lg">Category: {post.category}</p>
            <p className="text-lg">Written By: {post.author}</p>
            <p className="text-lg">
              Published On:{" "}
              {new Date(post.createdAt.seconds * 1000).toLocaleDateString()}
            </p>
            <p className="text-xl">{post.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
