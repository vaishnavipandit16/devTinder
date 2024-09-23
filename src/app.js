const express = require("express");
const connectDB = require("./config/database");
const User = require("./models/user");
const { validateSignupData } = require("./utils/validation");
const bcrypt = require("bcrypt");
const validator = require("validator");

const app = express();

app.use(express.json());

app.post("/signup", async (req, res) => {
  try {
    validateSignupData(req);
    const { firstName, lastName, emailId, password } = req.body;

    const passwordHash = await bcrypt.hash(password, 10);
    console.log(passwordHash);

    const user = new User({
      firstName,
      lastName,
      emailId,
      password: passwordHash,
    });
    await user.save();
    res.send("User added successfully.");
  } catch (err) {
    res.status(400).send("Error saving the data:" + err.message);
  }
});

app.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;
    if (!validator.isEmail(emailId)) {
      throw new Error("EmailId is not valid.");
    }

    const user = await User.findOne({ emailId: emailId });
    console.log("user", user);
    if (!user) {
      throw new Error("Invalid credentials.");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (isPasswordValid) {
      res.send("Login successfully.");
    } else {
      throw new Error("Invalid credentials.");
    }
  } catch (err) {
    res.status(400).send("Error while login: " + err.message);
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
app.patch("/user/:userId", async (req, res) => {
  const userId = req.params?.userId;
  const data = req.body;

  try {
    const ALLOWED_UPDATES = [
      "emailId",
      "gender",
      "photoUrl",
      "about",
      "age",
      "skills",
    ];

    const isUpdateAllowed = Object.keys(data).every((k) =>
      ALLOWED_UPDATES.includes(k)
    );

    if (!isUpdateAllowed) {
      throw new Error("Update not allowed.");
    }

    if (data?.skills.length > 10) {
      throw new Error("Skills cannot be more than 10.");
    }

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
