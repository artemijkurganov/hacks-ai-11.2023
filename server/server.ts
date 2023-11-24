import express from "express";
import cors from "cors";
import parser from "body-parser";
import { saveToCsv } from "./saveToCsv.ts";
import { runPythonScript } from "./runPythonScript.ts";
import { efficiencyModels, mainModels } from "../models.ts";

const app = express();
const port = 3010;

app.use(cors());
app.use(parser.json());

app.get("/", (_, res) => {
  res.send("Hello, TypeScript Express!");
});

app.post("/submit", (req, res) => {
  const data: string[][] = req.body;
  saveToCsv(data, "output", mainModels);
  res.sendStatus(200);
});

app.post("/runScript", (_, res) => {
  runPythonScript("./script/example.py", res);
});

app.post("/eff/submit", (req, res) => {
  const data: string[][] = req.body;
  saveToCsv(data, "efficiency", efficiencyModels);
  res.sendStatus(200);
});

app.post("/eff/runScript", (_, res) => {
  runPythonScript("./script/energy_effect.py", res);
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
