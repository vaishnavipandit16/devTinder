const express = require("express");
const connectDB = require("./config/database");
const User = require("./models/user");

const app = express();

app.use(express.json());

app.post("/signup", async (req, res) => {
  const user = new User(req.body);

  try {
    await user.save();
    res.send("User added successfully.");
  } catch (err) {
    res.status(400).send("Error saving the data:" + err.message);
  }
});

connectDB()
  .then(() => {
    console.log("Database Connection established.");
    app.listen(3000, () => {
      console.log("server is listening.");
    });
  })
  .catch((err) => {
    console.error("Database cannot be connected.");
  });
