import { useOutletContext } from "react-router-dom";
import styles from "../stylesheets/EditProfile.module.css";
import BackHeader from "./BackHeader";
import { useRef } from "react";

const EditProfile = () => {
  const [user, setUser, post, setPost] = useOutletContext();

  const profilePictureRef = useRef(null);
  const usernameRef = useRef(null);

  const submitEdits = async () => {
    try {
      e.preventDefault();
      // Separate profile picture and username?
      if (profilePictureRef.current.value && usernameRef.current.value) {
        const responseUsername = await fetch("/api/user/edit/username", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            id: user.id,
            username: usernameRef.current.value
          })
        });
        const dataUsername = await responseUsername.json();
        console.log(dataUsername);
      } else if (profilePictureRef.current.value) {
      } else if (usernameRef.current.value) {
      }
    } catch (error) {
      console.log(error);
    }
  };

  if (user) {
    return (
      <div className={styles.editProfile_container}>
        <BackHeader mode={"user"} user={user} />
        <form
          action=""
          className={styles.editProfile_form}
          onSubmit={submitEdits}
          encType="multipart/form-data"
        >
          <div>
            <label htmlFor="change_profile_picture">Change Profile Picture</label>
            <input type="file" id="change_profile_picture" ref={profilePictureRef} />
            <label htmlFor="edit_username">Edit Username</label>
            <input
              type="text"
              id="edit_username"
              placeholder={user.username}
              className={styles.edit_username}
              ref={usernameRef}
            />
          </div>
          <button>Submit</button>
        </form>
      </div>
    );
  }
};

export default EditProfile;
