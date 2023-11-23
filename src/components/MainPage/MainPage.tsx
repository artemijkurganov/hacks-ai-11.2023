import { Form } from "../Form/Form.tsx";
import { FileUpload } from "../FileUpload/FileUpload.tsx";
import { Button } from "@mui/material";

export const MainPage = () => {
  return (
    <div>
      <Form />
      <FileUpload />
      <Button variant="outlined">Тест запуска скрипта</Button>
    </div>
  );
};
