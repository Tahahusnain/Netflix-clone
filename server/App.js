import express from "express";
import { connectMongo } from "./src/config/db.js";
import cors from "cors";
import pkg from "body-parser";
const { urlencoded, json } = pkg;
import "dotenv/config";
import authRouter from "./src/routes/authRouter.js";
const app = express();

app.use(json());
app.use(urlencoded({ extended: true }));
app.use(cors());
app.use("/", authRouter);

app.listen(8000, async () => {
  await connectMongo();
  console.log("app listening on port 8000");
});
