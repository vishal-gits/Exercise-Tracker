import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
dotenv.config();

const dbConnect = () => {
  mongoose
    .connect(process.env.DB_CONNECT, {
      dbName: process.env.DB_NAME,
    })
    .then(() => console.log("connection is successful"))
    .catch((err) => console.log(err));
};

export default dbConnect;
