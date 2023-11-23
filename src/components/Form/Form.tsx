import styles from "./Form.module.css";
import { model } from "../../../model.ts";

export const Form = () => {
  return (
    <div className={styles.container}>
      <h2>Образец формы</h2>
      <div className={styles.inputFields}>
        {model.map((x) => {
          return x.inputType === "string" ? <div /> : <div />;
        })}
      </div>
    </div>
  );
};
