import styles from "../stylesheets/PostModal.module.css";
import Icon from "@mdi/react";
import { Link } from "react-router-dom";
import { mdiDotsHorizontal } from "@mdi/js";
import DisplayDate from "./DisplayDate";
import { useState } from "react";

const PostModal = (props) => {
  const [displayDeleteConfirmation, setDisplayConfirmation] = useState(false);

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
        setDisplayConfirmation(false);
        props.setDisplayPostModal(null);
        props.setPostList(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const hideDisplayPostModal = () => {
    setDisplayConfirmation(false);
    props.setDisplayPostModal(null);
  };

  if (props.displayPostModal) {
    return (
      <div className={styles.post_modal}>
        <div onClick={hideDisplayPostModal}></div>
        <div className={styles.post_edit}>
          <Icon path={mdiDotsHorizontal} onClick={hideDisplayPostModal} />
          {!displayDeleteConfirmation ? (
            <>
              <img src={props.displayPostModal.image} alt="" />
              <p>{props.displayPostModal.text}</p>
              <DisplayDate date={props.displayPostModal.postDate} />
              <div className={styles.post_modal_buttons}>
                <Link to={`/post/edit/${props.displayPostModal.id}`}>
                  <button>Edit Post</button>
                </Link>
                <button onClick={() => setDisplayConfirmation(true)}>Delete Post</button>
              </div>
            </>
          ) : (
            <>
              <p className={styles.delete_message}>Delete this post?</p>
              <button onClick={() => deletePost(props.displayPostModal.id)}>Confirm</button>
            </>
          )}
        </div>
      </div>
    );
  }
};

export default PostModal;
