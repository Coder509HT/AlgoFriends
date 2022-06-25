require("dotenv/config");
const express = require("express");
const mongoose = require("mongoose");
const { errorHandler } = require("./middlewares/error");

const app = express();
const port = process.env.PORT || 3001;

(async () => {
  try {
    await mongoose.connect(process.env.DATABASE_URI);

    app.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    });
  } catch (error) {
    console.log(error);
  }
})();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(errorHandler);

app.use("/users", require("./routes/user"));
