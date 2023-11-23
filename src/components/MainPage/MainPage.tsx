import { Form } from "../Form/Form.tsx";
import { FileUpload } from "../FileUpload/FileUpload.tsx";
import { Button } from "@mui/material";
import { runPythonScript } from "../../helpers/runPythonScript.ts";

export const MainPage = () => {
  return (
    <div>
      <Form />
      <FileUpload />
      <Button
        variant="outlined"
        onClick={() => {
          runPythonScript("main.py");
        }}
      >
        Тест запуска скрипта
      </Button>
    </div>
  );
};
