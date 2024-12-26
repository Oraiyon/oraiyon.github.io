import { Link, useOutletContext } from "react-router-dom";
import styles from "../stylesheets/Post.module.css";
import { useEffect, useState } from "react";
import { useRef } from "react";

const Post = () => {
  const [user, setUser, post, setPost] = useOutletContext();

  const [toFeed, setToFeed] = useState(false);

  const formTextRef = useRef(null);
  const toFeedRef = useRef(null);

  useEffect(() => {
    if (!user) {
      window.location.href = "/login";
    }
  }, []);

  useEffect(() => {
    if (toFeed) {
      toFeedRef.current.click();
    }
  }, [toFeed]);

  const writePost = async (e) => {
    try {
      e.preventDefault();
      const response = await fetch("/api/create/post", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          author: user.id,
          text: formTextRef.current.value
        })
      });
      const data = await response.json();
      if (data) {
        setToFeed(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  if (user) {
    return (
      <>
        <div className={styles.post_container}>
          <form action="" className={styles.post_form} onSubmit={writePost}>
            <label htmlFor="text">Write a post...</label>
            <textarea name="text" id="text" ref={formTextRef} required></textarea>
            <button>Post</button>
          </form>
        </div>
        <Link to={"/feed"} ref={toFeedRef} />
      </>
    );
  }
};

export default Post;
