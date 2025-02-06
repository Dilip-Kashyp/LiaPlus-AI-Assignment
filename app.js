import express from "express";
import cors from "cors";
const app = express();

app.use(express.json());

app.use(express.json());
app.use(cors());

const scholarshipRouter = require("./src/route/scholarshipRouter");
app.use("/api/v1/scholarship", scholarshipRouter);
module.exports = app;
