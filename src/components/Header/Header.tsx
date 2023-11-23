import styles from "./Header.module.css";
import logo from "./logo.svg";

export const Header = () => {
  return (
    <div className={styles.container}>
      <a>
        <img src={logo} alt="" />
      </a>
    </div>
  );
};
