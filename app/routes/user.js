const express = require("express");
const { create } = require("../controllers/user");
const { validate, userValidator } = require("../middlewares/validator");

const router = express.Router();

router.post("/create", userValidator, validate, create);

module.exports = router;
