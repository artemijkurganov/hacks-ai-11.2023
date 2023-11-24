import * as fs from "fs";
import { model } from "../model.ts";

export const saveToCsv = (formValues: string[][]) => {
  const fieldLabels = model.map((field) => field.name);
  const csvString = [fieldLabels.join(",")]
    .concat(formValues.map((form) => form.join(",")))
    .join("\n");

  fs.writeFile("./output.csv", csvString, (err) => {
    if (err) throw err;
    console.log("The file has been saved!");
  });
};
