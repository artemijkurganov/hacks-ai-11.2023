type InputType = "number" | "string" | "select";
export type ModelType = {
  inputType: InputType;
  name: string;
  items?: string[];
};

export const mainModels: ModelType[] = [
  { inputType: "number", name: "Площадь" },
  { inputType: "number", name: "Вложения" },
  {
    inputType: "select",
    name: "Качество",
    items: ["Удовлетворительное", "Хорошее", "Ветхое", "Аварийное"],
  },
];

export const efficiencyModels: ModelType[] = [
  { inputType: "number", name: "Общая площадь объекта недвижимости, кв. м" },
  { inputType: "number", name: "Общая площадь здания, кв. м" },
  { inputType: "number", name: "Занято службами Банка России" },
  { inputType: "number", name: "Не занято (не\xA0используется)" },
  { inputType: "number", name: "Балансовая стоимость, руб" },
  { inputType: "number", name: "Сумма начисленной амортизации" },
  { inputType: "string", name: "Техническое состояние" },
  { inputType: "number", name: "Количество помещений" },
];

export const nameForm = (index: number) => `Объект ${index + 1}`;
