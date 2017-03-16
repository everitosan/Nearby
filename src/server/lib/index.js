import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import api from "./api";
import config from "./config";
import morgan from "morgan";

const app = express();
const PORT = process.env.PORT || config[process.env.NODE_ENV].PORT;
const DB_URI =  process.env.MONGODB_URI || config[process.env.NODE_ENV].DBHost;

mongoose.connect(DB_URI);
app.use(express.static("public"));

if(process.env.NODE_ENV != "deploy") console.log(DB_URI);

if(process.env.NODE_ENV === "dev") app.use(morgan("tiny"));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use("/api", api);

app.listen(PORT, ()=> {
  console.log("Server is up and running on http://localhost:"+PORT);
});

module.exports = app;