import styles from "../stylesheets/ErrorPage.module.css";

const ErrorPage = () => {
  return (
    <div className={styles.error_page_container}>
      <h1>ERROR</h1>
      <p>PAGE NOT FOUND</p>
    </div>
  );
};

export default ErrorPage;
