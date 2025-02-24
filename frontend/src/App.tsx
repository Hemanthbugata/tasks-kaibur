import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import TaskList from './components/TaskList';
import TaskForm from './components/TaskForm';
import CommandExecution from './components/CommandExecution';

const App: React.FC = () => {
  return (
    <Router>
      <div style={{ padding: '20px' }}>
        <h1>Kaibur Tasks</h1>
        <Routes>
          <Route path="/" element={<TaskList />} />
          <Route path="/create" element={<TaskForm />} />
          <Route path="/execute" element={<CommandExecution />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
