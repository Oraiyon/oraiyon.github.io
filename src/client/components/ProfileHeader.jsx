import { useEffect, useRef, useState } from "react";
import styles from "../stylesheets/ProfileHeader.module.css";
import Follows from "./Follows";
import { Link } from "react-router-dom";
import DisplayProfilePicture from "./DisplayProfilePicture";

const ProfileHeader = (props) => {
  const [alreadyFollowing, setAlreadyFollowing] = useState(false);

  const settingsLinkRef = useRef(null);

  useEffect(() => {
    const fetchFollow = async () => {
      try {
        const response = await fetch(`/api/${props.user.id}/following/${props.userProfile.id}`);
        const data = await response.json();
        if (data) {
          setAlreadyFollowing(true);
        }
      } catch (error) {
        console.log(error);
      }
    };
    if (props.user) {
      fetchFollow();
    }
  }, []);

  const handleFollow = async () => {
    try {
      const response = await fetch("/api/send/follow", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          sender: props.userProfile.id,
          receiver: props.user.id
        })
      });
      const data = await response.json();
      if (data) {
        setAlreadyFollowing(true);
        props.setUpdateUserInfo((u) => !u);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleUnfollow = async () => {
    try {
      const response = await fetch(`/api/delete/follow/${props.userProfile.id}/${props.user.id}`, {
        method: "DELETE"
      });
      const data = await response.json();
      if (data) {
        setAlreadyFollowing(false);
        props.setUpdateUserInfo((u) => !u);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <header className={styles.header_container}>
      <div>
        <div>
          <div>
            <h1>{props.userProfile.username}</h1>
            <DisplayProfilePicture user={props.userProfile} />
          </div>
          <Follows
            followers={props.userProfile.FollowedBy}
            following={props.userProfile.Following}
          />
        </div>
        {props.mode === "user" ? (
          <button onClick={() => settingsLinkRef.current.click()}>Settings</button>
        ) : (
          ""
        )}
      </div>
      {props.user ? (
        <>
          {alreadyFollowing ? (
            <button onClick={handleUnfollow}>Unfollow</button>
          ) : (
            <button onClick={handleFollow}>Follow</button>
          )}
        </>
      ) : (
        ""
      )}
      <Link to={"/user/settings"} ref={settingsLinkRef} />
    </header>
  );
};

export default ProfileHeader;
