import styles from "../stylesheets/PostModal.module.css";
import Icon from "@mdi/react";
import { Link } from "react-router-dom";
import { mdiDotsHorizontal } from "@mdi/js";
import DisplayDate from "./DisplayDate";
import { useState } from "react";

const PostModal = (props) => {
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
        props.setDisplayPostModal(null);
        props.setPostList(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  if (props.displayPostModal) {
    return (
      <div className={styles.post_modal}>
        <div
          onClick={() => props.setDisplayPostModal(null)}
          className={styles.modal_dark_area}
        ></div>
        <div className={styles.post_edit}>
          <Icon path={mdiDotsHorizontal} onClick={() => props.setDisplayPostModal(null)} />
          <img src={props.displayPostModal.image} alt="" />
          <p>{props.displayPostModal.text}</p>
          <DisplayDate date={props.displayPostModal.postDate} />
          <div className={styles.post_modal_buttons}>
            <Link to={`/post/edit/${props.displayPostModal.id}`}>
              <button>Edit Post</button>
            </Link>
            <button onClick={() => deletePost(props.displayPostModal.id)}>Delete Post</button>
          </div>
        </div>
        <div
          onClick={() => props.setDisplayPostModal(null)}
          className={styles.modal_dark_area}
        ></div>
      </div>
    );
  }
};

export default PostModal;
