const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    title: String,
    description: String,
    date: Date,
    category: String, // "Exam", "Submission", "Event"
});

// Export the model directly
module.exports = mongoose.model('Task', taskSchema);
