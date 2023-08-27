import mongoose from "mongoose";
import { Schema, SchemaTypes, model } from "mongoose";

// const exerciseSchema = new Schema({
//     username: String,
//     description: String,
//     duration: {type: Number, max: 60, min: 0},
//     date: {type:Date, default: Date.now},
// })

// export const Exercise = model('Exercise',exerciseSchema)
const logSchema = new Schema({
  description: String,
  duration: { type: Number, max: 60, min: 0 },
  date: { type: Date, default: new Date() },
});
export const Log = model("Log", logSchema);
const userSchema = new Schema({
  username: String,
  count: { type: Number, default: 0 },
  log: [{ type: SchemaTypes.ObjectId, ref: "Log" }],
});

export const User = model("User", userSchema);
