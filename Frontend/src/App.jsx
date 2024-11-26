import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import useAuth from '../src/firbase/UseAuth'; // Hook to check auth state
import CalendarPage from './Pages/CalendarPage';
import Homepage from './Pages/Homepage';
import Loginpage from './Pages/Loginpage';
import RegisterPage from './Pages/RegisterPage';

function App() {
  const { user } = useAuth(); // Check if the user is logged in

  // Protected Route Component
 
  const ProtectedRoute = ({ children }) => {
    console.log('Current User:', user); // Debugging log
    if (!user) {
      return <Navigate to="/login" />; // Redirect to login if user is not authenticated
    }
    return children;
  };

  return (
    <Router>
      <div className="bg-yellow-100 h-screen">
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<Loginpage />} />
          <Route path="/register" element={<RegisterPage />} />

          {/* Protected Routes */}
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Homepage user={user}  />
               </ProtectedRoute>
            }
          />
          <Route
            path="/calendar"
            element={
               <ProtectedRoute>
                <CalendarPage user={user} />
               </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
