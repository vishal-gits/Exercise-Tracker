import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import dbConnect from "./db/connect.js";
import * as url from "url";
const __filename = url.fileURLToPath(import.meta.url);
const __dirname = url.fileURLToPath(new URL(".", import.meta.url));
import { User } from "./db/model.js";
import { userRouter } from "./routes/user.js";

// const express = require('express')
const app = express();
app.use(express.urlencoded({ extended: false }));
// parse json
app.use(express.json());

dotenv.config();

dbConnect();

app.use(cors());
app.use(express.static("public"));
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});

app.use("/api/users", userRouter);

const listener = app.listen(process.env.PORT || 3000, () => {
  console.log("Your app is listening on port " + listener.address().port);
});
