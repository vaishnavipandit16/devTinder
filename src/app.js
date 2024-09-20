const express = require("express");

const app = express();

app.use(
  "/user",
  (req, res, next) => {
    console.log("Save data to database.");
    next();
    // res.send("Data successfully saved to DB.");
  },
  (req, res, next) => {
    console.log("Save data to database 2.");
    // res.send("Data successfully saved to DB 2.");
    next();
  },
  (req, res, next) => {
    console.log("Save data to database 3.");
    // res.send("Data successfully saved to DB 3.");
    next();
  },
  (req, res, next) => {
    console.log("Save data to database 4.");
    res.send("Data successfully saved to DB 4.");
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
