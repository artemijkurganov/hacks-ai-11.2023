import { TextField } from "@mui/material";
import styles from "./Form.module.css";

export const Form = () => {
  return (
    <div className={styles.container}>
      <h2>Образец формы</h2>
      <div className={styles.inputFields}>
        <TextField />
        <TextField />
        <TextField />
        <TextField />
        <TextField />
        <TextField />
      </div>
    </div>
  );
};
