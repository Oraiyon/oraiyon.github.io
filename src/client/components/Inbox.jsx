import { useEffect } from "react";
import styles from "../stylesheets/Inbox.module.css";
import { useOutletContext } from "react-router-dom";
import DisplayDate from "./DisplayDate";

const Inbox = () => {
  const [user, setUser, post, setPost] = useOutletContext();

  useEffect(() => {}, []);

  if (user) {
    return (
      <div className={styles.inbox_container}>
        {user.Followers.map((follower) => (
          <div key={follower.id} className={styles.follower_notification}>
            <p>{follower.receiver.username}</p>
            <DisplayDate date={follower.followedDate} />
          </div>
        ))}
      </div>
    );
  }
};

export default Inbox;
