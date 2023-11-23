import { FormModel } from "../FormModel/FormModel.tsx";
import { FileUploader, Input } from "@skbkontur/react-ui";
import styles from "./MainPage.module.css";
import { useState } from "react";

export const MainPage = () => {
  const [formCount, setFormCount] = useState<number>(1);
  const handleSetFormCount = (value: string) => {
    const numberValue = +value;
    if (!numberValue || numberValue <= 0) return;
    setFormCount(numberValue);
  };
  return (
    <div className={styles.container}>
      <h1>Данные</h1>
      <p>Введите данные в форму ниже, или загрузите с помощью файла</p>
      <FileUploader />
      <br />
      <Input
        placeholder="Количество форм"
        onValueChange={handleSetFormCount}
        type="number"
        className={styles.fileCount}
      />
      <div className={styles.formContainer}>
        {Array(formCount)
          .fill(null)
          .map((_, i) => {
            return <FormModel index={i + 1} key={i} />;
          })}
      </div>
    </div>
  );
};
