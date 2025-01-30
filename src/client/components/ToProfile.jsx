import { Link } from "react-router-dom";
import styles from "../stylesheets/ToProfile.module.css";
import DisplayProfilePicture from "./DisplayProfilePicture";
import { useEffect } from "react";

const ToProfile = (props) => {
  useEffect(() => {}, []);

  const LinkToUser = (props) => {
    return (
      <Link to={`/user`}>
        <div className={styles.user_card}>
          <DisplayProfilePicture user={props.searchedUser} />
          <p>{props.searchedUser.username}</p>
        </div>
      </Link>
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
          <LinkToUser searchedUser={props.searchedUser} />
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
          <LinkToUser searchedUser={props.searchedUser} />
        )}
      </>
    );
  }
};

export default ToProfile;
