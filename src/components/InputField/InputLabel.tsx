import { PropsWithChildren } from "react";
import styles from "./InputLabel.module.css";

type InputLabelProps = PropsWithChildren<{
  name: string;
}>;

export const InputLabel = ({ name, children }: InputLabelProps) => {
  return (
    <div className={styles.container}>
      <p>{name}</p>
      {children}
    </div>
  );
};
