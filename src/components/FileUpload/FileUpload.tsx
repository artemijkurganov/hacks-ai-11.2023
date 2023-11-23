import { Button, styled } from "@mui/material";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

export const FileUpload = () => {
  return (
    <div>
      <h2>Образец загрузки файла</h2>
      <Button component="label" variant="contained">
        Загрузить файл
        <VisuallyHiddenInput type="file" />
      </Button>
    </div>
  );
};
