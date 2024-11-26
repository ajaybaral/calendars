const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const route = require("./route/userRoute.js");
const express = require('express');

const cors = require('cors');




const app = express();
app.use(bodyParser.json());
app.use(cors()); // Enable CORS for all routes

dotenv.config();

const PORT = process.env.PORT || 8000;
const MONGOURL = process.env.MONGO_URL;

console.log("Starting application...");

mongoose
  .connect(MONGOURL)
  .then(() => {
    console.log("DB connected successfully.");
    app.listen(PORT, () => {
      console.log(`Server is running on port: ${PORT}`);
    });
  })
  .catch((error) => console.log(error));

app.use("/api", route);
