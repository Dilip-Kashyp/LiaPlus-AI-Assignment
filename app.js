import express from "express";
import cors from "cors";
const app = express();

app.use(express.json());

app.use(express.json());
app.use(cors());
//home route
app.get("/", (req, res) => {
  res.status(200).json({
    message : "🚧 Page Under Construction 🚧 "
  })
})

const userRouter = require("./src/route/userRouter"); // update
app.use("/api/v1/user", userRouter);


const scholarshipRouter = require("./src/route/scholarshipRouter");
app.use("/api/v1/scholarship", scholarshipRouter);
module.exports = app;
