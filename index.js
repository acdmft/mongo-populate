const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config({
  path: "./config.env",
});
// MODELS 
const Student = require("./models/studentModel");
const Address = require("./models/addressModel");

app.use(express.json());

const mongoose = require("mongoose");
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  });

app.get("/", (_req, res) => {
  res.json({message: "Welcome to students API"});
});

// POST ADDRESS 
app.post("/student", async (req, res) => {
  let address = await Address.findOne({$and: [{"streetName": req.body.address.streetName}, {"streetNumber": req.body.address.streetNumber}, {"city": req.body.address.city}] });
  if (!address) {
    try {
      address = await Address.create(req.body.address);
    } catch (err) {
      return res.json({message: err});
    }
  }
  try {
    const student = new Student({
      firstName: req.body.student.firstName,
      surname: req.body.student.surname,
      address: address.id,
  });
  await student.save();
  } catch (err) {
    return res.json({message: err});
  }

  return res.json({message: "Student created"});
});

// GET STUDENT AND HIS ADDRESS 
app.get("/student/:id", async (req, res) => {
  const student = await Student.findById(req.params.id).populate("address");
  if (!student) {
    return res.json({message: `user with id ${req.params.id}`});
  }
  res.json({message: student});
});

app.listen(8001, () => console.log("Listen port 8001..."));