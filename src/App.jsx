import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login.jsx';
import UserProfile from './components/UserProfile';


function App() {
  return (
      <Router>
        <div className="app-container">
          <Routes>
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/profile" element={<UserProfile />} />
            <Route path="*" element={<Navigate to="/register" replace />} />
          </Routes>
        </div>
      </Router>
  );
}

export default App;