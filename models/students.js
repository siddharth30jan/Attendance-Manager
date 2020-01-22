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
    default: {
      physics: { P: 0, A: 0 },
      chemistry: { P: 0, A: 0 },
      maths: { P: 0, A: 0 }
    }
  }
});

module.exports = mongoose.model("Student", studentSchema);
