import { Link } from "react-router-dom";
import styles from "../stylesheets/ToProfile.module.css";

const ToProfile = (props) => {
  return (
    <div className={styles.user_card}>
      {!props.user || props.user.username !== props.searchedUser.username ? (
        <Link to={`/${props.searchedUser.id}/profile`}>{props.searchedUser.username}</Link>
      ) : (
        <Link to={`/user`}>{props.searchedUser.username}</Link>
      )}
    </div>
  );
};

export default ToProfile;
