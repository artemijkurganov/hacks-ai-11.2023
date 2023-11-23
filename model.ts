type InputType = "number" | "string";
type ModelType = {
  inputType: InputType;
  name: string;
};

export const model: ModelType[] = [
  { inputType: "string", name: "Поле 1" },
  { inputType: "string", name: "Поле 2" },
  { inputType: "number", name: "Поле 3" },
  { inputType: "number", name: "Поле 4" },
  { inputType: "number", name: "Поле 5" },
  { inputType: "string", name: "Поле 6" },
  { inputType: "string", name: "Поле 7" },
];
