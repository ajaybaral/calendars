import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Bell, User, LogOut, Menu, X } from 'lucide-react';
import MyCalendar from '../components/Calendar';
import Notification from '../components/Notification';
import Navbars from '../components/Navbar';
import useAuth from '../firbase/UseAuth'; // Ensure this is the correct import path
import axios from 'axios';

function Homepage({ user }) {
  const [uid, setUid] = useState(null);

  console.log(user);
  const userUid = user?.uid;
  const displayName = user?.displayName;
  console.log(userUid);
  console.log(displayName);

  useEffect(() => {
    if (user && user.uid) {
      const uids = user.uid;
      console.log("User ID from Firebase:", uids);
  
      const displayName = user.displayName;
      const userdata = { userid: uids, name: displayName }; // Update to match backend keys
      console.log("Data sent to backend:", userdata);
  
      setUid(uids);
  
      const fetchData = async () => {
        try {
          const response = await axios.post("http://localhost:8000/api/users", userdata);
          console.log("Response from backend:", response.data); // Add this to see the backend response
        } catch (error) {
          console.error("Error in axios POST request:", error);
        }
      };
  
      fetchData();
    }
  }, [user]);
  
  // if (loading) {
  //   return <div>Loading...</div>; // Show loading state while waiting for auth
  // }

  // if (!user) {
  //   return <div>No user found. Please log in.</div>; // Handle no user case
  // }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-100">
      {/* Navbar Component */}
      <Navbars />

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold text-center mb-8">
          Welcome to Your Personal Planner
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Calendar Component */}
          <div className="lg:col-span-2">
            <div className="bg-white shadow rounded-lg p-6">
              <h2 className="text-2xl font-semibold mb-4">Your Schedule</h2>
              {uid && <MyCalendar userid={uid} />}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Notification Component */}
            <div className="bg-white shadow rounded-lg p-6">
              <h2 className="text-xl font-semibold mb-4">Notifications</h2>
              {uid && <Notification userid={uid} />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Homepage;
