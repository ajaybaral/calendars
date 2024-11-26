import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify'; // Make sure to import toast
import { useNavigate } from 'react-router-dom'; // Assuming you're using React Router

const TaskForm = ({uid }) => { // Destructure uid here
    const navigate = useNavigate();
    const [task, setTaskState] = useState({
        title: '',
        date: '',
        category: 'exam', // default category
        description: '', // Added description state
    });

    console.log('TaskForm Component Loaded');
    console.log('UID from props:', uid); // Log the uid prop

    const handleSubmit = async (e) => {
        e.preventDefault();

        const taskData = { ...task, uid }; // Add uid to the task data before sending
        console.log('Task data before sending:', taskData); // Log the task data being sent to backend

        await axios
            .post("http://localhost:8000/api/addTask", taskData)
            .then((response) => {
                console.log('Response from backend:', response); // Log backend response
                toast.success(response.data.message, { position: "top-right" });
                // Optionally clear the form
                setTaskState({ title: '', date: '', category: 'exam', description: '' });
                navigate('/')
            })
            .catch((error) => {
                console.log('Error from backend:', error); // Log error if the API call fails
                toast.error("Error adding task", { position: "top-right" });
            });
    };

    return (
        <div className="flex justify-around p-8">
            <div className="p-6 rounded-lg shadow-lg w-full bg-white">
                <h1 className="text-2xl font-bold mb-4 text-center text-gray-800">Add Task</h1>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        type="text"
                        placeholder="Task Title"
                        value={task.title}
                        onChange={(e) => {
                            console.log('Title changed:', e.target.value); // Log title change
                            setTaskState({ ...task, title: e.target.value });
                        }}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                    />
                    <input
                        type="date"
                        value={task.date}
                        onChange={(e) => {
                            console.log('Date changed:', e.target.value); // Log date change
                            setTaskState({ ...task, date: e.target.value });
                        }}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                    />
                    <select
                        value={task.category}
                        onChange={(e) => {
                            console.log('Category changed:', e.target.value); // Log category change
                            setTaskState({ ...task, category: e.target.value });
                        }}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                    >
                        <option value="exam">Exam</option>
                        <option value="submission">Submission</option>
                        <option value="event">Event</option>
                    </select>
                    <textarea
                        placeholder="Task Description"
                        value={task.description}
                        onChange={(e) => {
                            console.log('Description changed:', e.target.value); // Log description change
                            setTaskState({ ...task, description: e.target.value });
                        }}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
                    />
                    <button type="submit" className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md">
                        Add Task
                    </button>
                </form>
            </div>
        </div>
    );
};

export default TaskForm;
