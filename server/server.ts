import express from "express";

const app = express();

app.get("/send", () => {});

app.listen(6000);
console.log("Backend server is ready — localhost:6000");
