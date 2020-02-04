
const router = require("express").Router();
const Workout = require("../models/workouts.js");


//creates workout
router.post("/api/workouts", (req, res) => {
  Workout.create({})
    .then(dbWorkout => {
      res.json(dbWorkout);
    })
    .catch(err => {
      res.status(400).json(err);
    });
});

// router.put("/api/workouts/:id", (req, res) => {
//   console.log(req)
//   Workout.create(req.body.text)
//     .then(dbWorkout => {
//       res.json(dbWorkout);
//     })
//     .catch(err => {
//       res.status(400).json(err);
//     });
// });

//creates exercise
router.put("/api/workouts/:id", (req, res) => {
  console.log(req.params.id)
  console.log(req.body)
  Workout.update(
    { _id: req.params.id},
    { $addToSet: { exercises: req.body}
  }).then(function(dbWorkout) {
    res.json(dbWorkout);
  });
  
});

//pulls all exercises and puts on page
router.get("/api/workouts", (req, res) => {
  Workout.find({})
    .then(dbWorkout => {
      res.json(dbWorkout);
    })
    .catch(err => {
      res.status(400).json(err);
    });
});

router.get("/api/workouts/range", (req, res) => {
  Workout.find({})
    .then(dbWorkout => {
      res.json(dbWorkout);
      // res.sendFile('stats.html', {root: './public/'})
    })
    .catch(err => {
      res.json(err);
    });
});


//feeds exercise page
router.get('/exercise', function(req, res) {
    res.sendFile('exercise.html', {root: './public/'})
});

//feeds exercise page
router.get('/stats', function(req, res) {
  res.sendFile('stats.html', {root: './public/'})
});





module.exports = router;





// const router = require("express").Router();
// //const Workout = require("../models/workouts.js");
// const db = require("../models/workouts.js");
// const express = require("express");
// const app = express();
// const logger = require("morgan");
// app.use(logger("dev"));

// //creates exercise
// app.put("/api/workouts/:id", (req, res) => {
//   ({_id}) => db.Workout.findOneAndUpdate({}, { $push: { exercises: req.body.text } }, { new: true })
//     .then(dbWorkout => {
//       res.json(dbWorkout);
//     })
//     .catch(err => {
//       res.json(err);
//     });
  
// });

// //creates workout
// app.post("/api/workouts", (req, res) => {
//   db.Workout.create(body)
//   .then(dbWorkout => {
//     res.json(dbWorkout);
//   })
//   .catch(err => {
//     res.json(err);
//   });
// });

// //pulls all exercises and puts on page
// app.get("/stats", (req, res) => {
//     db.Workout.find({})
//       .populate("workout")
//       .then(dbWorkout => {
//         res.json(dbWorkout);
//       })
//       .catch(err => {
//         res.json(err);
//       });
//   });

// //feeds exercise page
// router.get('/exercise', function(req, res) {
//     res.sendFile('exercise.html', {root: './public/'})
// });

// //feeds stats page
// router.get('/stats', function(req, res) {
//   res.sendFile('stats.html', {root: './public/'})
// });



// module.exports = router;
