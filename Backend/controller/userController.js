const Task = require('../model/task'); // Use CommonJS 'require'
const User = require('../model/user');

const createTask = async (req, res) => {
  try {
    const newTask = new Task(req.body);
    await newTask.save();
    res.status(201).json(newTask);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const deleteTask=async (req, res) => {
    try {
      const task = await Task.findByIdAndDelete(req.params.id);
      if (!task) return res.status(404).json({ message: 'Task not found' });
      res.json(task);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  
};

const updateTask = async (req, res) => {
    try {
      const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!task) return res.status(404).json({ message: 'Task not found' });
      res.json(task);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  
};

const getTasks = async (req, res) => {
  try {
    // Handle both cases where uid might come as object or string
    let uid;
    if (typeof req.params.uid === 'object') {
        uid = req.params.uid.uid; // If uid is wrapped in an object
    } else {
        uid = req.params.uid; // If uid is directly a string
    }

    console.log("Processing UID:", uid);
    
    if (!uid) {
        console.log("Invalid UID format");
        return res.status(400).json({ message: 'Invalid user ID format' });
    }

    // Find user and populate tasks in a single query
    const user = await User.findOne({ userid: uid })
        .populate({
            path: 'tasks',
            model: 'Task',
            options: { sort: { date: 1 } }
        });
    
    console.log("Database query result:", user);

    if (!user) {
        console.log(`No user found for UID: ${uid}`);
        return res.status(404).json({ 
            message: 'User not found',
            uid: uid 
        });
    }

    // Add null check for tasks array
    const tasks = user.tasks || [];
    console.log(`Found ${tasks.length} tasks for user ${uid}`);

    // Send the data to frontend
    res.status(200).json({
        message: 'Tasks fetched successfully',
        user: {
            userid: user.userid,
            name: user.name
        },
        tasks: tasks.map(task => ({
            id: task._id,
            title: task.title,
            description: task.description,
            date: task.date,
            category: task.category
        }))
    });

} catch (error) {
    console.error("Error in getUserTasksWithPopulate:", error);
    console.error("Error details:", {
        message: error.message,
        stack: error.stack
    });
    res.status(500).json({ 
        message: 'Internal Server Error', 
        error: error.message 
    });
}
};


const addTask = async (req, res) => {
  try {
    const { title, date, description, category, uid } = req.body;
    console.log("Received data from frontend:", { title, date, description, category, uid });
    
    // Validate if uid is provided
    if (!uid) {
      console.log("UID not provided");
      return res.status(400).json({ message: 'User ID is required' });
    }

    // Find the user by UID
    const user = await User.findOne({ userid: uid }); // Use userid field to match uid
    console.log("Found user:", user);

    if (!user) {
      console.log("User not found");
      return res.status(400).json({ message: 'User not found' });
    }

    // Create a new Task document matching your schema
    const newTask = new Task({
      title,
      date: new Date(date),
      description,
      category
    });
    console.log("New Task instance created:", newTask);

    // Save the new task
    await newTask.save();
    console.log("New Task saved to database:", newTask);

    // Add the new task _id to the user's tasks array
    user.tasks.push(newTask._id);
    await user.save();
    console.log("User's tasks array updated:", user.tasks);

    // Respond with success
    res.status(201).json({ 
      message: 'Task added successfully',
      task: newTask 
    });

  } catch (error) {
    console.error("Error in addTask:", error);
    res.status(400).json({ 
      message: 'Internal  Error',
      error: error.message 
    });
  }
};


const createUser = async (req, res) => {
  const { userid, name } = req.body;

  // Check if userid and name are present in the request body
  if (!userid || !name) {
    return res.status(400).json({ message: "Missing userid or name in request body" });
  }
  
  console.log("User to be created:", userid, name);

  try {
    // Check if a user with the same userid already exists
    const existingUser = await User.findOne({ userid });
    if (existingUser) {
      return res.status(200).json({ message: "User already exists", user: existingUser });
    }

    // Create a new user if not found
    const newUser = new User({ userid, name, tasks: [] });
    console.log("New user to be saved:", newUser);

    await newUser.save();
    res.status(201).json({ message: "User created successfully", user: newUser });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const updateTaskDate = async (req, res) => {
  try {
      const { uid, taskId } = req.params;
      const { date } = req.body;

      console.log(`Updating task ${taskId} for user ${uid} to date ${date}`);

      // Validate inputs
      if (!uid || !taskId || !date) {
          return res.status(400).json({
              message: 'Missing required fields'
          });
      }

      // Find the user
      const user = await User.findOne({ userid: uid });
      if (!user) {
          return res.status(404).json({
              message: 'User not found'
          });
      }

      // Check if the task belongs to the user
      if (!user.tasks.includes(taskId)) {
          return res.status(403).json({
              message: 'Task does not belong to this user'
          });
      }

      // Update the task
      const task = await Task.findByIdAndUpdate(
          taskId,
          { date: new Date(date) },
          { new: true, runValidators: true }
      );

      if (!task) {
          return res.status(404).json({
              message: 'Task not found'
          });
      }

      console.log('Task updated successfully:', task);

      res.status(200).json({
          message: 'Task updated successfully',
          task: {
              id: task._id,
              title: task.title,
              description: task.description,
              date: task.date,
              category: task.category
          }
      });

  } catch (error) {
      console.error('Error updating task:', error);
      res.status(500).json({
          message: 'Internal server error',
          error: error.message
      });
  }
};


module.exports = { createTask ,getTasks,addTask,updateTask,deleteTask,createUser,updateTaskDate}; // Use CommonJS 'module.exports'
