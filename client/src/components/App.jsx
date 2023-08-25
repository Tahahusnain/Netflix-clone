import React from "react";
import Signup from "./Signup";
import Home from "./Home";
import { Routes, Route } from "react-router-dom";
import LoginHelp from "./LoginHelp";
import PasswordReset from "./PasswordReset";
import Browse from "./Browse";
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/LoginHelp" element={<LoginHelp />} />
        <Route path="/password/:token" element={<PasswordReset />} />
        <Route path="/browse" element={<Browse />} />
      </Routes>
    </div>
  );
}

export default App;
