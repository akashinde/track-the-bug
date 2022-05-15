import './App.css';

import { useEffect } from 'react';
import { Routes, Route, Link, useNavigate } from 'react-router-dom'

import Navbar from './components/navbar';

import Login from './components/login'
import Register from './components/register'
import Dashboard from './components/dashboard';
import Tickets from './components/tickets';

import Page404 from './components/page404';

function App() {

  const navigate = useNavigate();

  let user = localStorage.getItem("user")

  useEffect(() => {
    if (user == undefined) {
      localStorage.setItem("user", "")
      navigate("/login")
    }
  }, [])

  return (
    <div className="App">
      {
        user ? (<Navbar />) : ""
      }
      <Routes>
        <Route exact path='/' element={<Login />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/dashboard" element={<Dashboard />} />
        <Route exact path="/tickets" element={<Tickets />} />
        <Route exact path="/register" element={<Register />} />
        
        <Route path="*" element={<Page404 />} />
      </Routes>
    </div>
  );
}

export default App;
