import { FormModel } from "../FormModel/FormModel.tsx";
import { Button, FileUploader, Input } from "@skbkontur/react-ui";
import styles from "./MainPage.module.css";
import { useState } from "react";
import { axiosInstance } from "../../helpers/axiosInstance.ts";
import { model } from "../../../model.ts";

const emptyModelState = Array(model.length).fill("");

export const MainPage = () => {
  const [formCount, setFormCount] = useState<number>(1);
  const [formState, setFormState] = useState<string[][]>([
    [...emptyModelState],
  ]);

  const handleSetFormCount = (value: string) => {
    const numberValue = +value;
    if (!numberValue || numberValue <= 0) return;
    setFormCount(numberValue);
    setFormState(
      Array.from({ length: numberValue }, () => [...emptyModelState]),
    );
  };

  const sendForm = async () => {
    await axiosInstance.post("/submit", formState);
    console.log(formState);
  };

  return (
    <div className={styles.container}>
      <h1>Данные</h1>
      <p>Введите данные в форму ниже, или загрузите с помощью файла</p>
      <FileUploader
        accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
        size="medium"
      />
      <br />
      <Input
        placeholder="Количество форм"
        onValueChange={handleSetFormCount}
        type="number"
        className={styles.fileCount}
        size="medium"
      />
      <Button
        use="primary"
        size="medium"
        className={styles.sendBtn}
        onClick={sendForm}
      >
        Отправить форму
      </Button>
      <div className={styles.formContainer}>
        {Array(formCount)
          .fill(null)
          .map((_, i) => {
            return (
              <FormModel
                index={i}
                key={i}
                state={formState[i]}
                setState={setFormState}
              />
            );
          })}
      </div>
    </div>
  );
};
