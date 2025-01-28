import { Link } from "react-router-dom";
import styles from "../stylesheets/ToProfile.module.css";
import DisplayProfilePicture from "./DisplayProfilePicture";

const ToProfile = (props) => {
  return (
    <>
      {!props.user || props.user.username !== props.searchedUser.username ? (
        <Link to={`/${props.searchedUser.id}/profile`}>
          <div className={styles.user_card}>
            <DisplayProfilePicture user={props.searchedUser} />
            <p>
              {props.searchedUser.username
                ? props.searchedUser.username
                : props.searchedUser.sender.username}
            </p>
          </div>
        </Link>
      ) : (
        <Link to={`/user`}>
          <div className={styles.user_card}>
            <DisplayProfilePicture user={props.searchedUser} />
            <p>{props.searchedUser.username}</p>
          </div>
        </Link>
      )}
    </>
  );
};

export default ToProfile;
