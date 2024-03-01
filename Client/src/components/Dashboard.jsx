import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Home';
import About from './About';
import Contact from './Contact';
import Login from './Login';
import Register from './Register';
import SocialSharing from './SocialSharing';
import WorkoutLogs from './WorkoutLogs';
import CaloriesTracking from './CaloriesTracking';
import PeronalizedRecommendatons from './PeronalizedRecommendatons';
import ProgressTracking from './ProgressTracking';
import GoalSetting from './GoalSetting';
import Blog from './Blog';
import Navbar from './Navbar';
import Nutrition from './Nutrition';
import DashBoard from './DashBoard'

function Dashboard() {
  return (
    <div className="dashboard">
      <Router>
        <Navbar />
        <div className="dashboard-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/account/login" element={<Login />} />
            <Route path="/account/register" element={<Register />} />
            <Route path="/socialsharing" element={<SocialSharing />} />
            <Route path="/workoutlogs" element={<WorkoutLogs />} />
            <Route path="/DashBoard" element={<DashBoard />} />
            <Route path="/calories" element={<CaloriesTracking />} />
            <Route path="/PersonalizedRecommendations" element={<PeronalizedRecommendatons/>} />
            <Route path="/progress" element={<ProgressTracking />} />
            <Route path="/goalsetting" element={<GoalSetting />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/nutrition" element={<Nutrition />} />
          </Routes>
        </div>
        <div className="content-display">
          {}
        </div>
      </Router>
    </div>
  );
}

export default Dashboard;