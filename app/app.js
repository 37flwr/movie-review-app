const express = require("express");
require("./db");

const userRouter = require("./routes/user");

const app = express();
app.use(express.json());

app.use("/api/user", userRouter);

app.listen(8080, () => {
  console.log("App is running on port http://localhost:8080");
});
