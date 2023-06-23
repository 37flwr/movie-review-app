const express = require("express");
const userRouter = require("./routes/user");

const app = express();
app.use("/api", userRouter);

app.listen(8080, () => {
  console.log("App is running on port http://localhost:8080");
});
