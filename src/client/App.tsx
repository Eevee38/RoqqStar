import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import LoginPage from './Components/LoginPage'
import RockEntries from './Components/RockEntries';
import SignUpPage from './Components/SignUpPage';
import ForgotPage from './Components/ForgotPage';

const App: React.FC = () => {
  return (
    <div className="appDiv">
      <h1 id='roqqstarh1'>RoqqStar</h1>
     
    <Router>
        <Routes>
            <Route path="/" element={<LoginPage/>}></Route>
            <Route path="/main" element={<RockEntries/>}></Route>
            <Route path="/signup" element={<SignUpPage/>}></Route>
            <Route path="/forgot" element={<ForgotPage/>}></Route>
        </Routes>
    </Router>
    </div>
  );
}

export default App;