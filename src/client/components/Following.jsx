import styles from "../stylesheets/Following.module.css";
import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import ToProfile from "./ToProfile";
import BackHeader from "./BackHeader";

const Following = () => {
  const [user, setUser, post, setPost] = useOutletContext();

  const [userFollowing, setUserFollowing] = useState([]);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(`/api/${window.location.pathname.split("/")[1]}/following`);
        const data = await response.json();
        setUserFollowing(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchUser();
  }, []);

  if (userFollowing.length) {
    return (
      <>
        <div className={styles.following_container}>
          <BackHeader mode={"profile"} />
          <div>
            {userFollowing.map((follow) => (
              <div key={follow.id} className={styles.following_card}>
                <ToProfile searchedUser={follow} user={null} />
              </div>
            ))}
          </div>
        </div>
      </>
    );
  } else {
    return (
      <>
        <div className={styles.following_container}>
          <BackHeader mode={"profile"} />
          <p>No Following.</p>
        </div>
      </>
    );
  }
};

export default Following;
