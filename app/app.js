const express = require("express");
require("express-async-errors");
require("dotenv").config();
require("./db");

const userRouter = require("./routes/user");
const { errorHandler } = require("./middlewares/error");

const app = express();
app.use(express.json());

app.use("/api/user", userRouter);

app.use(errorHandler);

app.listen(8080, () => {
  console.log("App is running on port http://localhost:8080");
});
