import express, { Request, Response } from "express";

const app = express();
const port = 3010;

app.get("/", (_: Request, res: Response) => {
  res.send("Hello, TypeScript Express!");
});

app.post("/submit", (req, res) => {
  const data = req.body;
  console.log(data);
  res.send("Data received");
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
