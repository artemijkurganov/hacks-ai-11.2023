import { TextField } from "@mui/material";
import styles from "./Form.module.css";
import { model } from "../../../model.ts";
import { Unstable_NumberInput as NumberInput } from "@mui/base/Unstable_NumberInput";

export const Form = () => {
  model;
  return (
    <div className={styles.container}>
      <h2>Образец формы</h2>
      <div className={styles.inputFields}>
        {model.map((x) => {
          return x.inputType === "string" ? <TextField /> : <NumberInput />;
        })}
      </div>
    </div>
  );
};
