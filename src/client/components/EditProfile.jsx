import { useOutletContext } from "react-router-dom";
import styles from "../stylesheets/EditProfile.module.css";
import BackHeader from "./BackHeader";

const EditProfile = () => {
  const [user, setUser, previousPage, setPreviousPage] = useOutletContext();

  if (user) {
    return (
      <>
        <BackHeader mode={"user"} user={user} />
        <p>EDIT PROFILE NAME?</p>
      </>
    );
  }
};

export default EditProfile;
