import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import styles from "../stylesheets/Followers.module.css";
import ToProfile from "./ToProfile";

const Followers = () => {
  const [user, setUser, post, setPost] = useOutletContext();

  const [userFollowers, setUserFollowers] = useState([]);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(`/api/${window.location.pathname.split("/")[1]}/followers`);
        const data = await response.json();
        console.log(data);
        setUserFollowers(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchUser();
  }, []);

  if (userFollowers) {
    return (
      <>
        <div className={styles.followers_container}>
          {userFollowers.map((follow) => (
            <div key={follow.id}>
              <ToProfile searchedUser={follow} />
            </div>
          ))}
        </div>
      </>
    );
  }
};

export default Followers;
