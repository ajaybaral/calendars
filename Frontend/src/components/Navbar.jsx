import React, { useState } from 'react';
import { Bell, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { signOut } from 'firebase/auth';
import { auth } from '../firbase/firebase'; // Ensure this path is correct
import { Link,NavLink } from 'react-router-dom';
import { Calendar, User, Menu, X } from 'lucide-react';

function Navbars() {
  const navigate = useNavigate(); // Get the navigate function

  const[isOpen,setIsOpen] = useState(false)

  const handleBellClick = () => {
    navigate('/calendar'); // Redirect to CalendarPage
  };

  const handleLogout = async () => {
    try {
      await signOut(auth); // Log out the user
      navigate('/login'); // Redirect to login page after logout
    } catch (error) {
      console.error("Logout error:", error); // Handle errors if needed
    }
  };

  return (
    <div className=" bg-gradient-to-br from-indigo-50 to-blue-100">
    {/* Navbar Component */}
    <nav className="bg-indigo-600 shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center text-white">
            <Link to="/" className="text-white text-2xl font-bold">Planner</Link>
            <div className="hidden md:block ml-10">
              <div className="flex space-x-4">
                <NavLink to="/" icon={<Calendar className="w-5 h-5" />}>Home</NavLink>
                <NavLink to="/calendar" icon={<Calendar className="w-5 h-5" />}>Calendar</NavLink>
                <NavLink to="/notifications" icon={<Bell className="w-5 h-5" />}>Notifications</NavLink>
                <NavLink to="/profile" icon={<User className="w-5 h-5" />}>Profile</NavLink>
              </div>
            </div>
          </div>
          <div className="hidden md:block">
            <button className="logout-btn bg-indigo-700 p-1 rounded-full">
              <span className="sr-only">Log out</span>
              <LogOut className="h-6 w-6" />
            </button>
          </div>
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="mobile-menu-btn bg-indigo-700 p-2 rounded-md"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? (
                <X className="block h-6 w-6" />
              ) : (
                <Menu className="block h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <MobileNavLink to="/" icon={<Calendar className="w-5 h-5" />}>Home</MobileNavLink>
            <MobileNavLink to="/calendar" icon={<Calendar className="w-5 h-5" />}>Calendar</MobileNavLink>
            <MobileNavLink to="/notifications" icon={<Bell className="w-5 h-5" />}>Notifications</MobileNavLink>
            <MobileNavLink to="/profile" icon={<User className="w-5 h-5" />}>Profile</MobileNavLink>
          </div>
          <div className="pt-4 pb-3 border-t border-indigo-700">
            <div className="flex items-center px-5">
              <img className="h-10 w-10 rounded-full" src="https://via.placeholder.com/40" alt="User avatar" />
              <div className="ml-3">
                <div className="text-base font-medium text-white">John Doe</div>
                <div className="text-sm font-medium text-indigo-300">john@example.com</div>
              </div>
              <button className="mobile-logout-btn ml-auto bg-indigo-700 p-1 rounded-full">
                <span className="sr-only">Log out</span>
                <LogOut className="h-6 w-6" />
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
    </div>
  );
}

export default Navbars;
