const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  subjects: {
    type: Object,
    default: { physics: 0, chemistry: 0, maths: 0 }
  }
});

module.exports = mongoose.model("Student", studentSchema);
