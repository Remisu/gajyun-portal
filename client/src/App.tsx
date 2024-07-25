import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import ScheduleManagement from './pages/ScheduleManagement';
import WorkSchedule from './pages/WorkSchedule';
import ProtectedRoute from './components/ProtectedRoute';
import Layout from './components/Layout';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route element={<Layout />}>
          <Route path="/schedule-management" element={<ProtectedRoute component={ScheduleManagement} />} />
          <Route path="/work-schedule" element={<ProtectedRoute component={WorkSchedule} />} />
        </Route>
        <Route path="/" element={<Login />} />
      </Routes>
    </Router>
  );
};

export default App;