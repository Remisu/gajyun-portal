// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Schedule from './components/Schedule';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/schedule"
          element={<ProtectedRoute component={Schedule} />}
        />
        <Route path="/" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
