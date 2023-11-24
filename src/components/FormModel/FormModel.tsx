import styles from "./FormModel.module.css";
import { ModelType, nameForm } from "../../../models.ts";
import { Input, Select } from "@skbkontur/react-ui";
import { InputLabel } from "../InputField/InputLabel.tsx";
import { Dispatch, SetStateAction } from "react";

type FormModelType = {
  index: number;
  state: string[];
  setState: Dispatch<SetStateAction<string[][]>>;
  model: ModelType[];
};

export const FormModel = ({ index, state, setState, model }: FormModelType) => {
  const onValueChange = (value: string, i: number) =>
    setState((prevState) => {
      const newState = [...prevState];
      newState[index][i] = value;
      return newState;
    });

  return (
    <div className={styles.container}>
      <h2>{nameForm(index)}</h2>
      <div className={styles.inputFields}>
        {model.map((x, i) => {
          return (
            <InputLabel name={x.name} key={x.name}>
              {x.inputType === "select" && (
                <Select
                  value={state[i]}
                  onValueChange={(value) => onValueChange(value, i)}
                  items={x.items}
                  width="200px"
                />
              )}
              {x.inputType !== "select" && (
                <Input
                  type={x.inputType === "string" ? undefined : "number"}
                  value={state[i]}
                  onValueChange={(value) => onValueChange(value, i)}
                />
              )}
            </InputLabel>
          );
        })}
      </div>
    </div>
  );
};
