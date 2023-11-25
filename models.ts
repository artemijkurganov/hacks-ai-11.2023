type InputType = "number" | "string" | "select";
export type ModelType = {
  inputType: InputType;
  name: string;
  items?: string[];
};

export const mainModels: ModelType[] = [
  { inputType: "number", name: "Год сметы" },
  { inputType: "string", name: "Подразделение БР" },
  { inputType: "string", name: "Наименование вида расходов" },
  { inputType: "string", name: "Направление расходов" },
  { inputType: "string", name: "Месяц" },
  { inputType: "number", name: "Отнесено" },
  { inputType: "number", name: "Количество" },
  { inputType: "number", name: "T" },
  { inputType: "number", name: "Общая площадь объекта недвижимости" },
  { inputType: "number", name: "Общая площадь здания" },
  { inputType: "number", name: "Занято службами Банка России" },
  { inputType: "number", name: "Год сметы" },
  { inputType: "number", name: "Не занято (не используется)" },
  { inputType: "number", name: "Балансовая стоимость" },
  { inputType: "number", name: "Сумма начисленной амортизации" },
  { inputType: "string", name: "Техническое состояние" },
  { inputType: "string", name: "Количество помещений" },
];

export const efficiencyModels: ModelType[] = [
  { inputType: "number", name: "Общая площадь объекта недвижимости" },
  { inputType: "number", name: "Общая площадь здания" },
  { inputType: "number", name: "Занято службами Банка России" },
  { inputType: "number", name: "Не занято (не\xA0используется)" },
  { inputType: "number", name: "Балансовая стоимость" },
  { inputType: "number", name: "Сумма начисленной амортизации" },
  { inputType: "string", name: "Техническое состояние" },
  { inputType: "string", name: "Количество помещений" },
];

export const nameForm = (index: number) => `Объект ${index + 1}`;
