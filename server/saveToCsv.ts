import * as fs from "fs";
import {ModelType} from "../models.ts";

export const saveToCsv = (formValues: string[][], filename: string, models: ModelType[]) => {
  const fieldLabels = models.map((field) => field.name);
  const csvString = [fieldLabels.join(",")]
    .concat(formValues.map((form) => form.join(",")))
    .join("\n");

  fs.writeFile(`./${filename}.csv`, csvString, (err) => {
    if (err) throw err;
    console.log("The file has been saved!");
  });
};
