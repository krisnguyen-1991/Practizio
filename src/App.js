import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ConversationPage from './components/ConversationPage';
import PracticePage from './components/PracticePage';

function App() {
  return (
    <Router future={{ v7_relativeSplatPath: true }}>
      <div className="App">
        <Routes>
          <Route path="/" element={<ConversationPage />} />
          <Route path="/practice" element={<PracticePage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

