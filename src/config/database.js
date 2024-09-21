const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose.connect(
    "mongodb+srv://vaishnavipandit168:3Ja7K9QbV52nHq6X@namastenode.7arnr.mongodb.net/devTinder"
  );
};

module.exports = connectDB;
