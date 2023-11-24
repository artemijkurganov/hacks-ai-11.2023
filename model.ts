type InputType = "number" | "string" | "select";
type ModelType = {
  inputType: InputType;
  name: string;
  items?: string[];
};

export const model: ModelType[] = [
  { inputType: "number", name: "Площадь" },
  { inputType: "number", name: "Вложения" },
  {
    inputType: "select",
    name: "Качество",
    items: ["Удовлетворительное", "Хорошее", "Ветхое", "Аварийное"],
  },
];

export const nameForm = (index: number) => `Объект ${index + 1}`;
