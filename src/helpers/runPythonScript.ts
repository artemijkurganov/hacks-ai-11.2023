import { spawn } from "child_process";

export const runPythonScript = (name: string) => {
  const command = "python3";
  const pythonProcess = spawn(command, [name]);

  pythonProcess.stdout.on("data", (data) => {
    console.log(data.toString());
  });

  pythonProcess.stderr.on("data", (data) => {
    console.error(data.toString());
  });

  pythonProcess.on("error", (error) => {
    console.error(error);
  });

  pythonProcess.on("close", (code) => {
    console.log(`Python script exited with code ${code}`);
  });
};
