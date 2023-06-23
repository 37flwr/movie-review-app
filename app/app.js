const express = require("express");
const userRouter = require("./routes/user");

const app = express();
app.use(userRouter);

app.listen(8000, () => {
  console.log("App is running on port http://localhost:8000");
});
