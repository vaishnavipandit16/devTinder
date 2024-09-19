const express = require("express");

const app = express();

app.get("/user/:userId/:name/:password", (req, res) => {
  console.log(req.query);
  console.log(req.params);
  res.send({ firstName: "Vaishnavi", lastName: "Pandit" });
});

app.post("/user", (req, res) => {
  console.log("Save data to database.");
  res.send("Data successfully saved to DB.");
});

app.delete("/user", (req, res) => {
  res.send("Deleted successfully.");
});

app.listen(3000, () => {
  console.log("server is listening.");
});
