import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import LoginPage from './Components/LoginPage'
import RockEntries from './Components/RockEntries';

const App: React.FC = () => {
  return (
    <div>
      <h1>RoqqStar</h1>
     
    <Router>
        <Routes>
            <Route path="/" element={<LoginPage/>}></Route>
            <Route path="/main" element={<RockEntries/>}></Route>
            </Routes>
    </Router>
    </div>
  );
}

export default App;