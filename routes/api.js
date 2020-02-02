const router = require("express").Router();
const Workout = require("../models/workouts.js");

//creates exercise
router.put("/api/workouts/:id", (req, res) => {
  Workout.update({
    exercises: req.body.text,
  }, {
    where: {
      id: req.params.id
    }
  }).then(function(dbWorkout) {
    res.json(dbWorkout);
  });
  
});

//creates workout
router.put("/api/workouts", ({ body }, res) => {
  Workout.create({
    where: {
      id: req.params.id
    }
  }).then(function(dbWorkout) {
    res.json(dbWorkout);
  });
});

//pulls all exercises and puts on page
router.get("/api/workouts", (req, res) => {
  Workout.find({})
    .sort({ day: -1 })
    .then(dbWorkout => {
      res.json(dbWorkout);
    })
    .catch(err => {
      res.status(400).json(err);
    });
});

//feeds exercise page
router.get('/exercise', function(req, res) {
    res.sendFile('exercise.html', {root: './public/'})
});

//feeds stats page
router.get('/stats', function(req, res) {
  res.sendFile('stats.html', {root: './public/'})
});



module.exports = router;
