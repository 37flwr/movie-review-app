const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost:27017/review_app")
  .then(() => {
    console.log("DB is successfully connected");
  })
  .catch((err) => {
    console.log("DB connection failed", err);
  });
