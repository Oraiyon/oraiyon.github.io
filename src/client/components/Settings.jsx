import { Link, useOutletContext } from "react-router-dom";
import styles from "../stylesheets/Settings.module.css";
import BackHeader from "./BackHeader";

const Settings = () => {
  const [user, setUser, post, setPost] = useOutletContext();

  if (user) {
    return (
      <div className={styles.settings_container}>
        <div>
          <BackHeader mode={"user"} user={user} />
          <div className={styles.settings_links}>
            <Link to={"/user/settings/edit"}>Edit Account Information</Link>
          </div>
        </div>
        <button>Log Out</button>
      </div>
    );
  }
};

export default Settings;
