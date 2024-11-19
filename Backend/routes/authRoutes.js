// const express = require("express");
// const { signupUser, loginUser } = require("../controllers/authController");

// const router = express.Router();

// router.post("/signup", require("../controllers/authController"));
// //router.post("/login", require("../controllers/authController"));

// module.exports = router;


const express = require("express");
const { signupUser, loginUser } = require("../controllers/authController");

const router = express.Router();

// Define the routes
router.post("/signup", signupUser);
router.post("/login", loginUser);

module.exports = router;
