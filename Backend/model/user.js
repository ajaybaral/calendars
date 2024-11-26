const mongoose = require('mongoose');
const { taskSchema } = require("../model/task"); 

const userSchema = new mongoose.Schema({
    userid: { type: String, unique: true }, // Ensures the id field is unique
    name: String,
    tasks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Task' }] // Array of task _ids
});

module.exports = mongoose.model('User', userSchema);
