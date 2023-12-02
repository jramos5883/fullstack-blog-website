"use client";

import { useState } from "react";
import ProtectedRoute from "../components/protectedRoute";
import { collection, addDoc, serverTimestamp } from "firebase/firestore"; // import serverTimestamp
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { blogStorage } from "../utils/firebase/firebase.utils";
import { db } from "../utils/firebase/firebase.utils";
import { Button } from "@mui/material";

export default function CreateTechBlogPost() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [category, setCategory] = useState("Tech"); // default category is "Tech"
  const [author, setAuthor] = useState(""); // default author is "John Doe" for now
  const [file, setFile] = useState(null); // set file to null initially

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let imageUrl = "";

    if (file) {
      const blogStorageRef = ref(blogStorage, `blogImages/${file.name}`);
      const snapshot = await uploadBytes(blogStorageRef, file);
      imageUrl = await getDownloadURL(snapshot.ref);
    }

    try {
      const docRef = await addDoc(collection(db, "posts"), {
        title,
        content,
        category,
        author,
        imageUrl,
        createdAt: serverTimestamp(),
      });
      console.log("Post created with ID: ", docRef.id);

      // Reset states after successful operation
      setTitle("");
      setContent("");
      setCategory("Tech");
      setAuthor("");
      setFile(null);
    } catch (error) {
      console.error("Error adding post: ", error);
    }
  };

  return (
    <ProtectedRoute>
      <div className="flex items-center justify-center pt-20">
        <form className="flex flex-col w-2/3" onSubmit={handleSubmit}>
          <label>Category:</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
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

          <label htmlFor="file">Upload Image:</label>
          <input type="file" id="file" onChange={handleFileChange} />

          <label>Blog Content:</label>
          <textarea
            placeholder="Content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            style={{ height: "500px" }} // set the height to 2/3 of the page
          />
          <Button type="submit" variant="contained" className="mt-4">
            Create Post
          </Button>
        </form>
      </div>
    </ProtectedRoute>
  );
}
