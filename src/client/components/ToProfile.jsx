import { Link } from "react-router-dom";
import styles from "../stylesheets/ToProfile.module.css";
import DisplayProfilePicture from "./DisplayProfilePicture";
import { useEffect } from "react";
import Icon from "@mdi/react";
import { mdiDotsHorizontal } from "@mdi/js";

const ToProfile = (props) => {
  useEffect(() => {}, []);

  const DisplayPostHeader = () => {
    const handlePostSettings = () => {
      props.setDisplayPostModal(props.searchedUser.id);
    };

    return (
      <div className={styles.post_header}>
        <Link to={`/user`}>
          <div className={styles.user_card}>
            <DisplayProfilePicture user={props.searchedUser} />
            <p>{props.searchedUser.username}</p>
          </div>
        </Link>
        <Icon path={mdiDotsHorizontal} onClick={handlePostSettings}></Icon>
      </div>
    );
  };

  if (props.searchedUser.sender || props.searchedUser.receiver) {
    return (
      <>
        {!props.user || props.user.username !== props.searchedUser.username ? (
          <Link
            to={`/${props.searchedUser.sender ? props.searchedUser.sender.id : props.searchedUser.receiver.id}/profile`}
          >
            <div className={styles.user_card}>
              <DisplayProfilePicture
                user={
                  props.searchedUser.sender
                    ? props.searchedUser.sender
                    : props.searchedUser.receiver
                }
              />
              <p>
                {props.searchedUser.sender
                  ? props.searchedUser.sender.username
                  : props.searchedUser.receiver.username}
              </p>
            </div>
          </Link>
        ) : (
          <DisplayPostHeader />
        )}
      </>
    );
  } else {
    return (
      <>
        {!props.user || props.user.username !== props.searchedUser.username ? (
          <Link to={`/${props.searchedUser.id}/profile`}>
            <div className={styles.user_card}>
              <DisplayProfilePicture user={props.searchedUser} />
              <p>{props.searchedUser.username}</p>
            </div>
          </Link>
        ) : (
          <DisplayPostHeader />
        )}
      </>
    );
  }
};

export default ToProfile;
