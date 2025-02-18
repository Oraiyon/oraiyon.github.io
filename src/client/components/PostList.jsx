import { useEffect, useState } from "react";
import styles from "../stylesheets/PostList.module.css";
import ToProfile from "./ToProfile";
import { Link } from "react-router-dom";
import Icon from "@mdi/react";
import { mdiCardsHeartOutline, mdiCommentOutline, mdiHeart, mdiDotsHorizontal } from "@mdi/js";

const PostList = (props) => {
  const [postList, setPostList] = useState([]);
  const [displayPostModal, setDisplayPostModal] = useState(null);

  useEffect(() => {
    const getPosts = async () => {
      try {
        let response;
        if (props.mode === "search") {
          response = await fetch("/api/get/posts");
          // For User.jsx
        } else if (props.mode === "user" && props.user) {
          response = await fetch(`/api/${props.user.id}/get/posts`);
          // For Profile.jsx
        } else if (props.mode === "profile" && props.userProfile) {
          response = await fetch(`/api/${props.userProfile.id}/get/posts`);
        }
        const data = await response.json();
        setPostList(data);
      } catch (error) {
        console.log(error);
      }
    };
    if (!props.followingPosts) {
      getPosts();
    } else {
      setPostList(props.followingPosts);
    }
  }, [props.followingPosts]);

  const DisplayDate = (props) => {
    const date = new Date(props.date);
    const options = {
      month: "short",
      day: "numeric",
      year: "numeric"
    };
    return <p className={styles.post_date}>{date.toLocaleDateString("en-us", options)}</p>;
  };

  const likePost = async (post) => {
    try {
      if (props.user) {
        const pathname = window.location.pathname.split("/");
        const pathtype = pathname[pathname.length - 1];
        const response = await fetch(`/api/${props.user.id}/like/post`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            id: props.user.id,
            post: post.id,
            page: pathtype ? pathtype : "search",
            authorId: post.authorId
          })
        });
        const data = await response.json();
        setPostList(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const HandleLikedPost = (props) => {
    const [liked, setLiked] = useState(false);

    useEffect(() => {
      if (props.user) {
        for (const like of props.post.Likes) {
          if (like.likedById === props.user.id) {
            setLiked(true);
            return;
          }
        }
      }
    }, []);

    return (
      <Icon
        path={liked ? mdiHeart : mdiCardsHeartOutline}
        onClick={() => likePost(props.post)}
        className={styles.like_icon}
      ></Icon>
    );
  };

  const deletePost = async (id) => {
    try {
      let response;
      if (props.mode === "user") {
        response = await fetch(`/api/${props.user.id}/delete/${id}/user`, {
          method: "DELETE"
        });
      } else {
        response = await fetch(`/api/${props.user.id}/delete/${id}`, {
          method: "DELETE"
        });
      }
      const data = await response.json();
      if (data) {
        setDisplayPostModal(null);
        setPostList(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {postList && postList.length ? (
        <div className={styles.post_container}>
          {postList.map((post) => (
            <>
              {displayPostModal !== post.authorId ? (
                <div key={post.id} className={styles.post_card}>
                  <ToProfile
                    searchedUser={post.author}
                    user={props.user}
                    setDisplayPostModal={setDisplayPostModal}
                  />
                  <img
                    src={post.image}
                    className={styles.post_image}
                    onClick={() => likePost(post)}
                  />
                  <p>{post.text}</p>
                  <div className={styles.post_info}>
                    <div className={styles.post_clicks}>
                      <div className={styles.like_section}>
                        <HandleLikedPost user={props.user} post={post} />
                        <Link to={`/${post.id}/likes`}>
                          <p>{post.Likes.length}</p>
                        </Link>
                      </div>
                      <div className={styles.comments_section}>
                        <Link to={`/${post.id}/comments`}>
                          <Icon path={mdiCommentOutline} className={styles.post_icon}></Icon>
                          <p>{post._count.Comments}</p>
                        </Link>
                      </div>
                    </div>
                    <DisplayDate date={post.postDate} />
                  </div>
                </div>
              ) : (
                <div className={styles.post_edit}>
                  <Icon path={mdiDotsHorizontal} onClick={() => setDisplayPostModal(null)} />
                  <Link to={`/post/edit/${post.id}`}>
                    <button>Edit Post</button>
                  </Link>
                  <button onClick={() => deletePost(post.id)}>Delete Post</button>
                </div>
              )}
            </>
          ))}
        </div>
      ) : (
        <div className={styles.no_posts}>No Posts Found.</div>
      )}
    </>
  );
};

export default PostList;
