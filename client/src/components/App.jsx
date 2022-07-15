import React from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom"
import Navbar from "./navbar/Navbar"
import Registration from "./authorization/Registration"
import Login from "./authorization/Login"
import Projectlist from "./projectlist/Projectlist"
import './app.css'

function App() {

  return (
    <BrowserRouter>
      <div className='container'>
        <Navbar />
          <Routes>
            <Route path="/registration" element={<Registration />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        <Projectlist />
      </div>
    </BrowserRouter>
  );
}

export default App;
