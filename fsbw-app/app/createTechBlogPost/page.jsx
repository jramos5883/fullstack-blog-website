"use client";

import { useState } from "react";
import { collection, addDoc, serverTimestamp } from "firebase/firestore"; // import serverTimestamp
import { db } from "../utils/firebase/firebase.utils";

export default function createTechBlogPost() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("tech"); // default category is "tech"
  const [author, setAuthor] = useState(""); // default author is "John Doe" for now

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const docRef = await addDoc(collection(db, "posts"), {
        title,
        content,
        category,
        author,
        createdAt: serverTimestamp(), // add timestamp to the post object
      });
      console.log("Post created with ID: ", docRef.id);
      setTitle("");
      setContent("");
      setCategory("Tech"); // reset category to "tech" after submitting the post
      setAuthor(""); // reset author to "" after submitting the post
    } catch (error) {
      console.error("Error adding post: ", error);
    }
  };

  return (
    <div className="flex items-center justify-center">
      <form className="flex flex-col w-2/3" onSubmit={handleSubmit}>
        <label>Category:</label>
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="Gaming">Gaming</option>
          <option value="Tech">Tech</option>
        </select>
        <label>Blog Title:</label>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <label>Author:</label>
        <input
          type="text"
          placeholder="Author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        />
        <label>Blog Content:</label>
        <textarea
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          style={{ height: "500px" }} // set the height to 2/3 of the page
        />
        <button type="submit">Create Post</button>
      </form>
    </div>
  );
}
