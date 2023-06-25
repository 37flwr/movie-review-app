const mongoose = require("mongoose");

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("DB is successfully connected");
  })
  .catch((err) => {
    console.log("DB connection failed", err);
  });
