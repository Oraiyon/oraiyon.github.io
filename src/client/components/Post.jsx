import { useOutletContext } from "react-router-dom";
import styles from "../stylesheets/Post.module.css";
import { useEffect, useState } from "react";
import { useRef } from "react";

const Post = () => {
  const [user, setUser, post, setPost] = useOutletContext();

  const imageRef = useRef(null);
  const textRef = useRef(null);
  const previewImageRef = useRef(null);

  useEffect(() => {
    if (!user) {
      window.location.href = "/login";
    }
  }, []);

  const writePost = async (e) => {
    try {
      e.preventDefault();
      if (imageRef.current.value && textRef.current.value) {
        const formData = new FormData();
        formData.append("author", user.id);
        formData.append("file", imageRef.current.files[0]);
        formData.append("text", textRef.current.value);
        const response = await fetch("/api/create/post", {
          method: "POST",
          body: formData
        });
        const data = await response.json();
        if (data) {
          imageRef.current.value = "";
          textRef.current.value = "";
          previewImageRef.current.src = "";
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handlePreview = (e) => {
    const output = previewImageRef.current;
    if (!e.target.files[0]) {
      output.src = "";
    } else {
      if (e.target.files[0].type === "image/jpeg") {
        if (imageRef.current.value !== "") {
          output.src = URL.createObjectURL(e.target.files[0]);
        }
      }
    }
    output.onload = () => URL.revokeObjectURL(output.src);
  };

  if (user) {
    return (
      <>
        <div className={styles.write_post_container}>
          <form action="" className={styles.post_form} onSubmit={writePost}>
            <label htmlFor="image">Create A Post</label>
            <input type="file" name="file" id="image" ref={imageRef} onChange={handlePreview} />
            <div className={styles.image_preview}>
              <img src="" alt="" ref={previewImageRef} />
            </div>
            <label htmlFor="text"></label>
            <input
              type="text"
              name="text"
              id="text"
              ref={textRef}
              className={styles.post_caption}
              placeholder="Write a caption..."
            ></input>
            <button>Post</button>
          </form>
        </div>
      </>
    );
  }
};

export default Post;
