const express = require('express');
const cors = require('cors');

const app = express();
const port = 3000;
app.use(cors());

app.use(express.static('static'));

let activities = [
  { activityId: 1, type: 'Running', duration: 30, caloriesBurned: 300 },
  { activityId: 2, type: 'Swimming', duration: 45, caloriesBurned: 400 },
  { activityId: 3, type: 'Cycling', duration: 60, caloriesBurned: 500 },
];

// Endpoint 1
function activityAdded(activityId, type, duration, caloriesBurned) {
  let addActivity = { activityId, type, duration, caloriesBurned };
  activities.push(addActivity);
  return activities;
}

app.get('/activities/add', (req, res) => {
  let activityId = parseInt(req.query.activityId);
  let type = req.query.type;
  let duration = parseInt(req.query.duration);
  let caloriesBurned = parseInt(req.query.caloriesBurned);
  let result = activityAdded(activityId, type, duration, caloriesBurned);
  res.json({ activities: result });
});

// Endpoint 2
function sortActivityByDuration(activities1, activities2) {
  return activities1.duration - activities2.duration;
}

app.get('/activities/sort-by-duration', (req, res) => {
  let result = activities.sort(sortActivityByDuration);
  res.json({ activities: result });
});

// Endpoint 3
function filterActivitiesByType(activities, type) {
  return activities.type === type;
}

app.get('/activities/filter-by-type', (req, res) => {
  let type = req.query.type;
  let result = activities.filter((activities) =>
    filterActivitiesByType(activities, type)
  );
  res.json({ activities: result });
});

// Endpoint 4
function totalCaloriesBurned() {
  let caloriesBurned = 0;
  for (let c = 0; c < activities.length; c++) {
    caloriesBurned = caloriesBurned + activities[c].caloriesBurned;
  }
  return caloriesBurned;
}

app.get('/activities/total-calories', (req, res) => {
  let result = totalCaloriesBurned();
  res.json({ totalCaloriesBurned: result });
});

// Endpoint 5
function activityUpdateById(activityId, duration) {
  for (let c = 0; c < activities.length; i++) {
    if (activities[c].activityId === activityId) {
      activities[c].duration = duration;
    }
    return activities;
  }
}

app.get('/activities/update-duration', (req, res) => {
  let activityId = parseInt(req.query.activityId);
  let duration = parseInt(req.query.duration);
  let result = activityUpdateById(activityId, duration);
  res.json({ activities: result });
});

// Endpoint 6
function deleteActivityById(activities, activityId) {
  return activities.activityId != activityId;
}

app.get('/activities/delete', (req, res) => {
  let activityId = parseInt(req.query.activityId);
  let result = activities.filter((activities) =>
    deleteActivityById(activities, activityId)
  );
  res.json({ activities: result });
});

// Endpoint 7
function deleteActivityByType(activities, type) {
  return activities.type != type;
}

app.get('/activities/delete-by-type', (req, res) => {
  let type = req.query.type;
  let result = activities.filter((activities) =>
    deleteActivityByType(activities, type)
  );
  res.json({ activities: result });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
