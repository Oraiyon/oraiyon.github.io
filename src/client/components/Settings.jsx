import { Link, useOutletContext } from "react-router-dom";
import styles from "../stylesheets/Settings.module.css";
import BackHeader from "./BackHeader";
import Icon from "@mdi/react";
import { mdiAccountEdit } from "@mdi/js";

const Settings = () => {
  const [user, setUser, post, setPost] = useOutletContext();

  if (user) {
    return (
      <div className={styles.settings_container}>
        <div>
          <BackHeader mode={"user"} user={user} />
          <div className={styles.settings_links}>
            <Link to={"/user/settings/edit"}>
              <div>
                <Icon path={mdiAccountEdit}></Icon>
                <p>Edit Account Information</p>
              </div>
            </Link>
          </div>
        </div>
        <button>Log Out</button>
      </div>
    );
  }
};

export default Settings;
