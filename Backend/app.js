const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./Config/db");
const authRoutes = require("./routes/authRoutes");
const mongoose = require("mongoose"); // Import mongoose


dotenv.config();

 connectDB();

// mongoose.connect(process.env.MONGO_URI, {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   })
//   .then(() => console.log("MongoDB Connected"))
//   .catch((error) => {
//     console.error(`Error connecting to MongoDB: ${error.message}`);
//     process.exit(1); // Exit if connection fails
//   });

const app = express();

app.use(express.json());

app.use("/api/auth", require("./routes/authRoutes"));

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
