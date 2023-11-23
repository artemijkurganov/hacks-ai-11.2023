import styles from "./FormModel.module.css";
import { model } from "../../../model.ts";
import { Input } from "@skbkontur/react-ui";
import { InputLabel } from "../InputField/InputLabel.tsx";
import { Dispatch, SetStateAction } from "react";

type FormModelType = {
  index: number;
  state: string[];
  setState: Dispatch<SetStateAction<string[][]>>;
};

export const FormModel = ({ index, state, setState }: FormModelType) => {
  return (
    <div className={styles.container}>
      <h2>Форма {index + 1}</h2>
      <div className={styles.inputFields}>
        {model.map((x, i) => {
          return (
            <InputLabel name={x.name} key={x.name}>
              <Input
                type={x.inputType === "string" ? undefined : "number"}
                value={state[i]}
                onValueChange={(value) =>
                  setState((prevState) => {
                    const newState = [...prevState];
                    newState[index][i] = value;
                    return newState;
                  })
                }
              />
            </InputLabel>
          );
        })}
      </div>
    </div>
  );
};
