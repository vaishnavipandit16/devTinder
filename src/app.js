const express = require("express");
const connectDB = require("./config/database");
const cookieParser = require("cookie-parser");

const app = express();

app.use(express.json());
app.use(cookieParser());

const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const requestRouter = require("./routes/request");
const userRouter = require("./routes/user");

app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);
app.use("/", userRouter);

// get user by email
// app.get("/user", async (req, res) => {
//   const userEmail = req.body.emailId;
//   try {
//     const users = await User.find({ emailId: userEmail });
//     if (users.length === 0) {
//       res.status(404).send("User not found.");
//     } else {
//       res.send(users);
//     }
//   } catch (err) {
//     res.status(400).send("Something went wrong.");
//   }
// });

// // get user by id
// app.get("/userById", async (req, res) => {
//   const userId = req.body._id;
//   try {
//     const user = await User.findById(userId);
//     if (!user) {
//       res.status(404).send("User not found.");
//     } else {
//       res.send(user);
//     }
//   } catch (err) {
//     res.status(400).send("Something went wrong.");
//   }
// });

// app.get("/feed", async (req, res) => {
//   try {
//     const users = await User.find({});
//     // if (users.length === 0) {
//     //   res.status(404).send("User not found.");
//     // } else {
//     res.send(users);
//     // }
//   } catch (err) {
//     res.status(400).send("Something went wrong.");
//   }
// });

// // delete user by id
// app.delete("/user", async (req, res) => {
//   const userId = req.body.userId;
//   try {
//     const user = await User.findByIdAndDelete(userId);
//     res.send("User deleted successfully");
//   } catch (err) {
//     res.status(400).send("Something went wrong.");
//   }
// });

// //update data of the user
// app.patch("/user/:userId", async (req, res) => {
//   const userId = req.params?.userId;
//   const data = req.body;

//   try {
//     const ALLOWED_UPDATES = [
//       "emailId",
//       "gender",
//       "photoUrl",
//       "about",
//       "age",
//       "skills",
//     ];

//     const isUpdateAllowed = Object.keys(data).every((k) =>
//       ALLOWED_UPDATES.includes(k)
//     );

//     if (!isUpdateAllowed) {
//       throw new Error("Update not allowed.");
//     }

//     if (data?.skills.length > 10) {
//       throw new Error("Skills cannot be more than 10.");
//     }

//     const user = await User.findByIdAndUpdate({ _id: userId }, data, {
//       returnDocument: "before",
//       runValidators: true,
//     });
//     console.log(user);
//     res.send("User updated successfully.");
//   } catch (err) {
//     res.status(400).send("UPDATE FAILED:" + err.message);
//   }
// });

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
