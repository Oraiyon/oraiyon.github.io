import { useEffect } from "react";
import styles from "../stylesheets/Inbox.module.css";
import { useOutletContext } from "react-router-dom";
import DisplayDate from "./DisplayDate";
import ToProfile from "./ToProfile";

const Inbox = () => {
  const [user, setUser, post, setPost] = useOutletContext();

  useEffect(() => {}, []);

  if (user) {
    return (
      <div className={styles.inbox_container}>
        {user.Following.map((follower) => (
          <div key={follower.id} className={styles.follower_notification}>
            <ToProfile searchedUser={follower.sender} user={null} />
            <DisplayDate date={follower.followedDate} />
          </div>
        ))}
      </div>
    );
  }
};

export default Inbox;
