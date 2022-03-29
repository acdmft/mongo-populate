const mongoose = require("mogoose");

const studentSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  surname: {
    type: String,
    required: true,
  },
  address: [{ type: mongoose.Types.ObjectId, ref: "Address"}],
});

const Student = mongoose.model("Student", studentSchema);

module.exports = Student;