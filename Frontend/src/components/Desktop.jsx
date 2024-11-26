import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import TaskForm from './form';

const customStyles = `
  .calendar-container {
    display: flex;
    justify-content: center;
    width: 100%;
  }
  .react-calendar {
    width: 100%;
    max-width: 800px;
    background: white;
    border: none;
    font-family: Arial, sans-serif;
    padding: 20px;
  }
  .react-calendar__month-view__days__day--weekend {
    color: #d10000;
  }
  .react-calendar__tile {
    max-width: 100%;
    height: 80px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #e6f7ff;
    padding: 5px !important;
  }
  .react-calendar__navigation {
    background-color: #ffff00;
    padding: 10px 0;
    margin-bottom: 20px;
  }
  .react-calendar__navigation button {
    color: black;
    min-width: 44px;
    background: none;
    font-size: 16px;
    margin: 0 10px;
  }
  .react-calendar__navigation button:enabled:hover,
  .react-calendar__navigation button:enabled:focus {
    background-color: brown;
    color: white;
    cursor: pointer;
  }
  .react-calendar__tile--active {
    background-color: #ffff00 !important;
    color: black;
  }
  .react-calendar__tile--active:enabled:hover,
  .react-calendar__tile--active:enabled:focus {
    background-color: #0000ff !important;
    color: white;
  }

`;

const MyCalendar = () => {
    const [date, setDate] = useState(new Date(2024, 8, 1)); // September 2024
   

   
    return (
        <div className="flex flex-col items-center min-h-screen bg-yellow-100 p-8">
            <style>{customStyles}</style>
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-4xl">
                <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Calendar Marking</h1>
                <div className="calendar-container">
                    <Calendar
                        onChange={setDate}
                        value={date}
                        className="border-none"
                        showWeekNumbers={false}
                        formatShortWeekday={(locale, date) => ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'][date.getDay()]}
                        tileClassName={({ date, view }) => {
                            // Apply different colors based on the task category
                         
                        }}
                    />
                </div>
                {/* Pass the setDate function to TaskForm */}
                
            </div>
        </div>
    );
};

export default MyCalendar;
