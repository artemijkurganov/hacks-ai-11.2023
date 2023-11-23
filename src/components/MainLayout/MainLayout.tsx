import { Outlet } from "react-router-dom";
import { Header } from "../Header/Header";
import styles from "./MainLayout.module.css";

export const MainLayout = () => (
  <div className={styles.root}>
    <Header />
    <div className={styles.content}>
      <Outlet />
    </div>
  </div>
);
