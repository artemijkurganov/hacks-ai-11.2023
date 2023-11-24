import { FormModel } from "../FormModel/FormModel.tsx";
import { Button, FileUploader, Input, Link, Toast } from "@skbkontur/react-ui";
import styles from "./MainPage.module.css";
import { useState } from "react";
import { axiosInstance } from "../../helpers/axiosInstance.ts";
import { model } from "../../../model.ts";
import { csvToFormState } from "../../helpers/csvToFormState.ts";

const emptyModelState = Array(model.length).fill("");

export const MainPage = () => {
  const [formCount, setFormCount] = useState<number>(1);
  const [formState, setFormState] = useState<string[][]>([
    [...emptyModelState],
  ]);
  const [isSendFormSuccess, setSendFormSuccess] = useState(false);
  const [isSendFormLoading, setSendFormLoading] = useState(false);
  const [isRunScriptLoading, setRunScriptLoading] = useState(false);

  const handleSetFormCount = (value: string) => {
    const numberValue = +value;
    if (!numberValue || numberValue <= 0) return;
    setFormCount(numberValue);
    setFormState(
      Array.from({ length: numberValue }, () => [...emptyModelState]),
    );
  };

  const sendForm = async () => {
    setSendFormLoading(true);
    await new Promise((resolve) => {
      setTimeout(() => resolve(true), 1000);
    });
    const response = await axiosInstance.post("/submit", formState);
    if (response.status === 200) {
      Toast.push("Данные формы сохранены");
      setSendFormSuccess(true);
    }
    setSendFormLoading(false);
  };

  const runScript = async () => {
    setRunScriptLoading(true);
    await new Promise((resolve) => {
      setTimeout(() => resolve(true), 1000);
    });
    const response = await axiosInstance.post("/runScript");
    if (response.status === 200) {
      Toast.push(response.data);
    }
    setRunScriptLoading(false);
  };

  return (
    <div className={styles.container}>
      <h1>Данные</h1>
      <p>Введите данные в форму ниже, или загрузите с помощью файла</p>
      <FileUploader
        accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
        size="medium"
        request={async (file) => {
          const formState = await csvToFormState(file.originalFile);
          setFormState(formState);
          setFormCount(formState.length);
          await Promise.resolve();
        }}
      />
      <br />
      <div className={styles.fileCount}>
        <Input
          placeholder="Количество форм"
          value={formCount.toString()}
          onValueChange={handleSetFormCount}
          type="number"
          size="medium"
        />
        <Button
          use="primary"
          size="medium"
          className={styles.sendBtn}
          onClick={sendForm}
          loading={isSendFormLoading}
        >
          Сохранить форму
        </Button>
      </div>

      {isSendFormSuccess && !isSendFormLoading && (
        <div style={{ marginTop: "16px" }}>
          Данные формы сохранены. Вы можете скачать файл в формате .csv и
          запустить скрипт
          <div className={styles.fileCount}>
            <Button
              use="primary"
              size="medium"
              onClick={runScript}
              loading={isRunScriptLoading}
            >
              Выполнить скрипт
            </Button>
            <Link href="/output.csv" target="_blank">
              Скачать файл
            </Link>
          </div>
        </div>
      )}
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
