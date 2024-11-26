import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function Notification({ userid }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        // Make sure userid is a string, not an object
        const uidString = typeof userid === 'object' ? userid.uid : userid;
        
        console.log("Fetching tasks for user:", uidString);
        const response = await axios.get(`http://localhost:8000/api/${uidString}/tasks`);
        
        console.log("Raw response:", response.data);

        // Check if we have tasks in the response
        if (response.data && response.data.tasks) {
          const currentDate = new Date();
          const upcomingTasks = response.data.tasks
            .filter(task => new Date(task.date) > currentDate)
            .sort((a, b) => new Date(a.date) - new Date(b.date));

          console.log("Filtered upcoming tasks:", upcomingTasks);
          setData(upcomingTasks);
        } else {
          setData([]);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    if (userid) {
      fetchData();
    }
  }, [userid]);

  const handleDelete = async (taskid) => {
    try {
      const uidString = typeof userid === 'object' ? userid.uid : userid;
      console.log(`Deleting task with ID: ${taskid} for user: ${uidString}`);
      
      await axios.delete(`http://localhost:8000/api/${uidString}/${taskid}`);
      setData(data.filter((task) => task.id !== taskid));
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  if (loading) {
    return <p className="text-center p-4">Loading...</p>;
  }

  if (error) {
    return <p className="text-center p-4 text-red-500">Error: {error}</p>;
  }

  return (
    <div>
      <h1 className="text-4xl flex items-center justify-center">Your Tasks</h1>
      <div className='max-h-96 overflow-y-scroll'>
        {data.length > 0 ? (
          data.map((task) => (
            <div key={task.id} className="bg-blue-500 p-4 m-5 rounded-md max-w-4xl flex flex-row items-center justify-center text-white">
              <h1 className="w-20 p-3">{task.title}</h1>
              <p className="max-w-md p-3">{task.description}</p>
              <p className="p-3">{new Date(task.date).toLocaleDateString()}</p>
              <button 
                onClick={() => handleDelete(task.id)}
                className="px-4 py-2 bg-red-500 rounded hover:bg-red-600 transition-colors"
              >
                Delete
              </button>
            </div>
          ))
        ) : (
          <p className="text-center p-4">No upcoming tasks found.</p>
        )}
      </div>
    </div>
  );
}