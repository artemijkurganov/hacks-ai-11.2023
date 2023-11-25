import { FormModel } from "../FormModel/FormModel.tsx";
import { Button, FileUploader, Input, Link, Toast } from "@skbkontur/react-ui";
import styles from "../MainPage/MainPage.module.css";
import { useState } from "react";
import { axiosInstance } from "../../helpers/axiosInstance.ts";
import { efficiencyModels } from "../../../models.ts";
import { csvToFormState } from "../../helpers/csvToFormState.ts";
import { ModalWithResult } from "../Modal/Modal.tsx";

const emptyModelState = Array(efficiencyModels.length).fill("");

export const EfficiencyPage = () => {
  const [formCount, setFormCount] = useState<number>(1);
  const [formState, setFormState] = useState<string[][]>([
    [...emptyModelState],
  ]);
  const [isSendFormSuccess, setSendFormSuccess] = useState(false);
  const [isSendFormLoading, setSendFormLoading] = useState(false);
  const [isRunScriptLoading, setRunScriptLoading] = useState(false);

  const [isModalOpened, setModalOpened] = useState(false);
  const [scriptResult, setScriptResult] = useState("");

  const handleSetFormCount = (value: string) => {
    const numberValue = +value;
    if (!numberValue || numberValue <= 0) return;
    setFormCount(numberValue);

    const currentFormState = formState;

    if (numberValue > currentFormState.length) {
      const additionalForms = Array.from(
        { length: numberValue - currentFormState.length },
        () => [...emptyModelState],
      );
      setFormState([...currentFormState, ...additionalForms]);
    } else if (numberValue < currentFormState.length) {
      setFormState(currentFormState.slice(0, numberValue));
    }
  };

  const sendForm = async () => {
    setSendFormLoading(true);
    await new Promise((resolve) => {
      setTimeout(() => resolve(true), 1000);
    });
    const response = await axiosInstance.post("/eff/submit", formState);
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
    const response = await axiosInstance.post("/eff/runScript");
    if (response.status === 200) {
      setScriptResult(response.data);
      setModalOpened(true);
    }
    setRunScriptLoading(false);
  };

  return (
    <div className={styles.container}>
      {isModalOpened && (
        <ModalWithResult
          onClose={() => setModalOpened(false)}
          result={scriptResult}
        />
      )}
      <h1>Данные эффективности</h1>
      <p>Введите данные в форму ниже, или загрузите с помощью файла</p>
      <FileUploader
        accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
        size="medium"
        request={async (file) => {
          const formState = await csvToFormState(file.originalFile, ",");
          setFormState(formState);
          setFormCount(formState.length - 1 );
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
            <Link href="/efficiency.csv" target="_blank">
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
                model={efficiencyModels}
              />
            );
          })}
      </div>
    </div>
  );
};
