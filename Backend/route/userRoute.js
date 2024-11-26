const express = require('express');

const { createTask,getTasks,addTask,createUser,updateTaskDate } = require('../controller/userController.js'); // Change here
const route = express.Router();

// Define your routes here
route.get("/", (req, res) => {
  res.send("Welcome to the API");
});


route.post("/addTask", addTask);
route.get('/Tasks',getTasks);
route.get('/:uid/tasks',getTasks);
route.post('/users', createUser);
router.patch('/:uid/tasks/:taskId', updateTaskDate);

module.exports = route;