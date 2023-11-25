import { Link, useLocation } from "react-router-dom";

import styles from "./MenuNavItem.module.css";
import { PropsWithChildren, ReactNode } from "react";

type MenuNavItemProps = PropsWithChildren<ReactNode> & {
  to: string;
};

export const MenuNavItem = ({ children, to }: MenuNavItemProps) => {
  const location = useLocation();

  return (
    <Link className={styles.root} to={to}>
      {location.pathname === to ? <b>{children}</b> : <>{children}</>}
    </Link>
  );
};
