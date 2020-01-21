const route = require("express").Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const auth = require("./auth");
const { Students } = require("../models");

//Get all students
route.get("/", async (req, res) => {
  try {
    let student = await Students.find({});
    return res.json({ msg: "success", student });
  } catch (error) {
    return res.status(400).json({ error });
  }
});

//login
route.post("/login", async (req, res) => {
  const { email, password } = req.body;
  if (!email) return res.status(400).json({ err: "Invalid Email!" });
  if (!password) return res.status(400).json({ err: "Invalid Password!" });

  let stud = await Students.findOne({ email });
  if (!stud) return res.status(400).json({ err: "Email doesnot exist!" });

  let result = await bcrypt.compare(password, stud.password);
  if (!result) return res.status(400).json({ err: "Password doesnot match!" });
  // console.log(process.env.JWT);
  //All constraints cleared,get the token and send it
  const token = await jwt.sign({ id: stud.id }, process.env.JWT);
  res.json({ msg: "success", token });
});

//signup
route.post("/signup", async (req, res) => {
  const { email, password, name } = req.body;
  if (!name) return res.status(400).json({ err: "Enter name!" });
  if (!email) return res.status(400).json({ err: "Enter Email!" });
  if (!password) return res.status(400).json({ err: "Enter Password!" });

  let salt = await bcrypt.genSaltSync(10);
  let hash = await bcrypt.hashSync(password, salt);
  try {
    let newStud = await new Students({
      name,
      email,
      password: hash
    }).save();
    return res.status(200).json({ msg: "success", newStud });
  } catch (error) {
    return res.status(400).json({ error });
  }
});

//show my attendance
route.get("/myattendance/:sub", auth, async (req, res) => {
  try {
    let student = await Students.find({ _id: req.id });
    //console.log(student);
    return res.status(200).json({
      msg: "success",
      attendance: student[0].subjects[req.params.sub.toString()]
    });
  } catch (error) {
    return res.status(400).json({ error });
  }
});

module.exports = route;

//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlMGZiNTVlNDYyNDgwNzdmODU4NDRhOSIsImlhdCI6MTU3ODIwMTA4Mn0.7iYUcpQXpePDt5IDDv_RS_Ht-QMg8tP7YKLOwCV6NRE
