type InputType = "number" | "string";
type ModelType = {
  inputType: InputType;
  name: string;
};

export const model: ModelType[] = [
  { inputType: "string", name: "Ячейка 1" },
  { inputType: "string", name: "Ячейка 2" },
  { inputType: "number", name: "Ячейка 3" },
  { inputType: "number", name: "Ячейка 4" },
  { inputType: "number", name: "Ячейка 5" },
  { inputType: "string", name: "Ячейка 6" },
  { inputType: "string", name: "Ячейка 7" },
];

export const nameForm = (index: number) => `Форма ${index + 1}`;
