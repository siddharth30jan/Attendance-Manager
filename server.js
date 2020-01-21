const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(cors());
//Database
mongoose
  .connect(process.env.DATABASE)
  .then(() => console.log(`database connected`))
  .catch(err => console.log(`err:  ${err}`));

app.use("/api", require("./routes"));

const PORT = process.env.PORT || 5001;

app.listen(PORT, () => console.log(`server up and running on PORT ${PORT}`));
