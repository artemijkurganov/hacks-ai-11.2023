import express, { Request, Response } from "express";
import cors from "cors";
import parser from "body-parser";
import {saveToCsv} from "./saveToCsv.ts";
import {runPythonScript} from "./runPythonScript.ts";

const app = express();
const port = 3010;

app.use(cors());
app.use(parser.json());

app.get("/", (_: Request, res: Response) => {
  res.send("Hello, TypeScript Express!");
});

app.post("/submit", (req, res) => {
  const data: string[][] = req.body;
  console.log(data);
  saveToCsv(data);
  runPythonScript("./script/example.py")
  res.send("Data received");
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
