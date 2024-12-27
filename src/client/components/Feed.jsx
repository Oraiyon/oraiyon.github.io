import { useEffect, useState } from "react";
import { Link, useOutletContext } from "react-router-dom";
import PostList from "./PostList";
import styles from "../stylesheets/Feed.module.css";

const Feed = () => {
  const [user, setUser, post, setPost] = useOutletContext();

  const [followingPosts, setFollowingPosts] = useState([]);

  useEffect(() => {
    const fetchFeed = async () => {
      try {
        const response = await fetch(`/api/${user.id}/get/following/posts`);
        const data = await response.json();
        setFollowingPosts(data);
      } catch (error) {
        console.log(error);
      }
    };
    if (user) {
      fetchFeed();
    }
  }, []);

  if (user && followingPosts) {
    return (
      <div className={styles.feed_container}>
        <PostList followingPosts={followingPosts} />
      </div>
    );
  }
};

export default Feed;
