import styles from "./Header.module.css";
import logo from "./logo.svg";
import { MenuItem } from "@skbkontur/react-ui";
import { MenuNavItem } from "../MenuNavItem/MenuNavItem.tsx";
import { Link } from "react-router-dom";

export const Header = () => {
  return (
    <div className={styles.container}>
      <Link to="/">
        <img src={logo} alt="" />
      </Link>
      <div className={styles.headerMenu}>
        <MenuNavItem to="/">
          <MenuItem>Коммунальные платежи</MenuItem>
        </MenuNavItem>
        <MenuNavItem to="/efficiency">
          <MenuItem>Эффектиность</MenuItem>
        </MenuNavItem>
      </div>
    </div>
  );
};
