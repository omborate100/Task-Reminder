import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import TaskPage from './components/TaskPage'
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>  {/* Updated from <Switch> to <Routes> */}
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/tasks" element={<TaskPage />} />
          <Route path="/" element={<Navigate replace to="/signin" />} /> {/* Redirects using Navigate */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
