import React, { useState, useEffect } from 'react';
import MyCalendar from '../components/Calendar';
import TaskForm from '../components/form';
import Navbar from '../components/Navbar';

const CalendarPage = ({ user }) => {
  const [uid, setUid] = useState(null);

  useEffect(() => {
    if (user?.uid) {
      setUid(user.uid);
      console.log('User UID:', user.uid);
    }
  }, [user]); // Dependency array ensures it runs only when 'user' changes

  return (
    <div>
      {/* Navbar Component */}
      <Navbar />

      {/* Main Content */}
      <div className='flex justify-center flex-col items-center bg-gradient-to-br from-indigo-50 to-blue-100'>
        {/* Calendar Component */}
        <div className="lg:col-span-2 p-4">
          <div className="bg-white shadow rounded-lg h-auto p-8">
            {uid && <MyCalendar userid={uid} />} {/* Render MyCalendar only when UID is available */}
          </div>
        </div>

        {/* Task Form for adding new tasks */}
        <TaskForm uid={uid}/>
      </div>
    </div>
  );
};

export default CalendarPage;
