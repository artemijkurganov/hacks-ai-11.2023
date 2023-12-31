import { spawn } from "child_process";
import { Response } from "express";

export const runPythonScript = (name: string, res: Response) => {
  const command = "python3";
  const pythonProcess = spawn(command, [name]);
  let outputData = "";

  pythonProcess.stdout.on("data", (data) => {
    console.log(data.toString());
    outputData += data.toString();
  });

  pythonProcess.stderr.on("data", (data) => {
    console.error(data.toString());
  });

  pythonProcess.on("error", (error) => {
    console.error(error);
  });

  pythonProcess.on("close", (code) => {
    console.log(`Python script exited with code ${code}`);
    res.status(200).send(outputData);
  });
};
