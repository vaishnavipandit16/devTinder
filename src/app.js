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

// get user by email
app.get("/user", async (req, res) => {
  const userEmail = req.body.emailId;
  try {
    const users = await User.find({ emailId: userEmail });
    if (users.length === 0) {
      res.status(404).send("User not found.");
    } else {
      res.send(users);
    }
  } catch (err) {
    res.status(400).send("Something went wrong.");
  }
});

// get user by id
app.get("/userById", async (req, res) => {
  const userId = req.body._id;
  try {
    const user = await User.findById(userId);
    if (!user) {
      res.status(404).send("User not found.");
    } else {
      res.send(user);
    }
  } catch (err) {
    res.status(400).send("Something went wrong.");
  }
});

app.get("/feed", async (req, res) => {
  try {
    const users = await User.find({});
    // if (users.length === 0) {
    //   res.status(404).send("User not found.");
    // } else {
    res.send(users);
    // }
  } catch (err) {
    res.status(400).send("Something went wrong.");
  }
});

// delete user by id
app.delete("/user", async (req, res) => {
  const userId = req.body.userId;
  try {
    const user = await User.findByIdAndDelete(userId);
    res.send("User deleted successfully");
  } catch (err) {
    res.status(400).send("Something went wrong.");
  }
});

//update data of the user
app.patch("/user", async (req, res) => {
  const userId = req.body.userId;
  const data = req.body;
  try {
    const user = await User.findByIdAndUpdate({ _id: userId }, data, {
      returnDocument: "before",
      runValidators: true,
    });
    console.log(user);
    res.send("User updated successfully.");
  } catch (err) {
    res.status(400).send("UPDATE FAILED:" + err.message);
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
