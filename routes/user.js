import express from "express";
import {
  postUser,
  getUser,
  postExercises,
  getLogs,
} from "../controller/user.js";

export const userRouter = express.Router();

userRouter.post("/", postUser);
userRouter.get("/", getUser);
userRouter.post("/:_id/exercises", postExercises);
userRouter.get("/:_id/logs/", getLogs);
