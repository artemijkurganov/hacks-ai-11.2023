import styles from "./FormModel.module.css";
import { model } from "../../../model.ts";
import { Input } from "@skbkontur/react-ui";
import { InputLabel } from "../InputField/InputLabel.tsx";

type FormModelType = {
  index: number;
};

export const FormModel = ({ index }: FormModelType) => {
  return (
    <div className={styles.container}>
      <h2>Форма {index}</h2>
      <div className={styles.inputFields}>
        {model.map((x) => {
          return (
            <InputLabel name={x.name}>
              <Input type={x.inputType === "string" ? undefined : "number"} />
            </InputLabel>
          );
        })}
      </div>
    </div>
  );
};
