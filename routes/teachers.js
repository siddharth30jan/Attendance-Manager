const route = require("express").Router();
const { Teachers, Students } = require("../models");
const bcrypt = require("bcryptjs");
const auth = require("./auth");
const jwt = require("jsonwebtoken");

//Get all  Teachers
route.get("/", async (req, res) => {
  try {
    let teachers = await Teachers.find({});
    res.status(200).json({ msg: "success", data: teachers });
  } catch (error) {
    res.status(400).json({ msg: "error", err: error });
  }
});

//Login route

route.post("/login", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ err: "Enter values" });

  let Teacher = await Teachers.findOne({ email });
  if (!Teacher) return res.status(400).json({ err: "Email doesnot exist" });
  let result = await bcrypt.compare(password, Teacher.password);
  if (!result) return res.status(400).json({ err: "Password Incorrect" });
  const token = await jwt.sign({ id: Teacher.id }, process.env.JWT);
  res.json({ msg: "success", token });
});
//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVlMTA2M2ZmZDliY2NhNTM4NGY1ZTlhNSIsImlhdCI6MTU3ODEzMjU4NX0.jCBh7DqPcSLksSq8kWLAceFwRO6WkpKSWi-jhBaX4wk

//Add a teacher
route.post("/signup", async (req, res) => {
  const { name, email, password, subject } = req.body;
  if (!name || !email || !password || !subject)
    return res.json({ msg: "ENter valid field values" });
  try {
    let salt = await bcrypt.genSaltSync(10);
    let hash = await bcrypt.hashSync(password, salt);
    await new Teachers({
      name,
      email,
      password: hash,
      subject
    }).save();
    res.status(200).json({ msg: "success" });
  } catch (error) {
    res.status(400).json({ msg: "error", err: error });
  }
});

//Increase the attendance

route.get("/:id", auth, async (req, res) => {
  try {
    let teacher = await Teachers.findOne({ _id: req.id });
    // console.log(teacher);
    let Student = await Students.findOne({ _id: req.params.id });
    //console.log(Student);
    //console.log(Student.subjects);
    Student.subjects[teacher.subject.toString()]++;
    let newStudent = await Students.findByIdAndUpdate(
      Student._id,
      { subjects: Student.subjects },
      { new: true }
    );
    res.status(200).json({ msg: "success", newStudent });
  } catch (error) {
    res.status(400).json({ msg: "error", err: error });
  }
});

module.exports = route;
