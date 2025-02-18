import { Link, useOutletContext } from "react-router-dom";
import styles from "../stylesheets/Post.module.css";
import { useEffect, useState } from "react";
import { useRef } from "react";

const Post = () => {
  const [user, setUser, post, setPost] = useOutletContext();

  const [postInfo, setPostInfo] = useState(null);

  const imageRef = useRef(null);
  const textRef = useRef(null);
  const previewImageRef = useRef(null);
  const homeRef = useRef(null);

  useEffect(() => {
    if (!user) {
      window.location.href = "/login";
    }
    if (window.location.href.split("/").length === 6) {
      const fetchPost = async () => {
        try {
          const response = await fetch(`/api/get/${window.location.href.split("/")[5]}`);
          const data = await response.json();
          setPostInfo(data);
        } catch (error) {
          console.log(error);
        }
      };
      fetchPost();
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

  const updatePost = async (e) => {
    try {
      e.preventDefault();
      const response = await fetch(`/api/update/post/${postInfo.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          id: postInfo.id,
          text: textRef.current.value
        })
      });
      const data = await response.json();
      if (data) {
        homeRef.current.click();
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
        <div className={styles.create_post_container}>
          <form action="" className={styles.post_form} onSubmit={postInfo ? updatePost : writePost}>
            <div>
              <label htmlFor="image">{postInfo ? "Update" : "Create"} A Post</label>
              {postInfo ? (
                ""
              ) : (
                <input type="file" name="file" id="image" ref={imageRef} onChange={handlePreview} />
              )}
            </div>
            <div className={styles.image_preview}>
              <img src={postInfo ? postInfo.image : ""} alt="" ref={previewImageRef} />
            </div>
            <label htmlFor="text"></label>
            <input
              type="text"
              name="text"
              id="text"
              ref={textRef}
              className={styles.post_caption}
              placeholder="Write a caption..."
              defaultValue={postInfo ? postInfo.text : ""}
            ></input>
            <button>{postInfo ? "Update Post" : "Create Post"}</button>
          </form>
        </div>
        <Link to={"/"} ref={homeRef}></Link>
      </>
    );
  }
};

export default Post;
