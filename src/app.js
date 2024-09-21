const express = require("express");

const app = express();

app.use("/", (err, req, res, next) => {
  if (err) {
    res.status(500).send("Something went wrong.");
  }
});

app.get("/getUserData", (req, res) => {
  try {
    throw new Error("bfjkds");
    res.send("All Data sent.");
  } catch (err) {
    res.status(500).send("Some error contact support team.");
  }
});

// const { adminAuth, userAuth } = require("./middlewares/auth");

// Handle auth middleware for all request get, post, patch, put, delete
// app.use("/admin", adminAuth);

// app.get("/user", userAuth, (req, res) => {
//   res.send("All Data sent111.");
// });

// app.post("/user/loggedIn", (req, res) => {
//   res.send("User logged in successfully.");
// });

// app.get("/admin/getAllData", (req, res) => {
//   res.send("All Data sent.");
// });

// app.delete("/admin/deleteUser", (req, res) => {
//   res.send("Deleted a user.");
// });

app.use("/", (req, res, next) => {
  // console.log("Save data to database 2.");
  // res.send("Data successfully saved to DB 2.");
  next();
});

app.get(
  "/user",
  (req, res, next) => {
    console.log("Save data to database.");
    next();
    // res.send("Data successfully saved to DB.");
  },
  (req, res) => {
    console.log("Save data to database 2.");
    res.send("Data successfully saved to DB 2.");
    // next();
  }
);

// app.get("/user/:userId/:name/:password", (req, res) => {
//   console.log(req.query);
//   console.log(req.params);
//   res.send({ firstName: "Vaishnavi", lastName: "Pandit" });
// });

// app.post("/user", (req, res) => {
//   console.log("Save data to database.");
//   res.send("Data successfully saved to DB.");
// });

// app.delete("/user", (req, res) => {
//   res.send("Deleted successfully.");
// });

app.listen(3000, () => {
  console.log("server is listening.");
});
