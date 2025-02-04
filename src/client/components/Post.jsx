import { useOutletContext } from "react-router-dom";
import styles from "../stylesheets/Post.module.css";
import { useEffect } from "react";
import { useRef } from "react";

const Post = () => {
  const [user, setUser, post, setPost] = useOutletContext();

  const imageRef = useRef(null);
  const textRef = useRef(null);

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
        console.log(data);
        if (data) {
          imageRef.current.value = "";
          textRef.current.value = "";
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  if (user) {
    return (
      <>
        <div className={styles.write_post_container}>
          <form action="" className={styles.post_form} onSubmit={writePost}>
            <label htmlFor="image">Post an image</label>
            <input type="file" name="file" id="image" ref={imageRef} required />
            <div className={styles.image_preview}></div>
            <label htmlFor="text"></label>
            <input
              type="text"
              name="text"
              id="text"
              ref={textRef}
              required
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
