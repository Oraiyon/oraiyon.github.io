import { Link } from "react-router-dom";
import styles from "../stylesheets/ToProfile.module.css";
import DisplayProfilePicture from "./DisplayProfilePicture";

const ToProfile = (props) => {
  return (
    <div className={styles.user_card}>
      <DisplayProfilePicture user={props.searchedUser} />
      {!props.user || props.user.username !== props.searchedUser.username ? (
        <Link to={`/${props.searchedUser.id}/profile`}>{props.searchedUser.username}</Link>
      ) : (
        <Link to={`/user`}>{props.searchedUser.username}</Link>
      )}
    </div>
  );
};

export default ToProfile;
