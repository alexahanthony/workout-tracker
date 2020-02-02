const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const workoutSchema = new Schema({
  day: {
    type: Date,
    default: Date.now
  },
  exercises:{
    type: Array,
    trim: true,
    required: "Enter a name for your exercise"
  }
});

const Workout = mongoose.model("workout", workoutSchema);

module.exports = Workout;
