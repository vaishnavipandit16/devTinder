const express = require("express");

const app = express();

app.use("/test", (req, res) => {
  res.send("Responded");
});

app.listen(3000, () => {
  console.log("server is listening.");
});
