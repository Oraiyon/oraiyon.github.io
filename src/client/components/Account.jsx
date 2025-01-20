import { Link, useOutletContext } from "react-router-dom";
import styles from "../stylesheets/Account.module.css";
import BackHeader from "./BackHeader";

const Account = () => {
  const [user, setUser, post, setPost] = useOutletContext();

  if (user) {
    return (
      <div className={styles.account_container}>
        <div>
          <BackHeader mode={"user"} user={user} />
          <Link to={"/user/account/edit"}>Edit Account Information</Link>
        </div>
        <button>Log Out</button>
      </div>
    );
  }
};

export default Account;
