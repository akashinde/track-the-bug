import './App.css';

import { useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom'

import Navbar from './components/navbar';

import Login from './components/login'
import Register from './components/register'
import Dashboard from './components/dashboard';
import Tickets from './components/tickets';

import Page404 from './components/page404';

function App() {
  const navigate = useNavigate();
  
  let user = localStorage.getItem("user") || ""
  
  useEffect(() => {
    if (user === "") {
      navigate("/login")
    }
  }, [user])

  return (
    <div className="App">
      {
        user ? (
          <>
            <Navbar />
            <div className="main-container">
              <Routes>
                <Route exact path='/' element={<Login />} />
                <Route exact path="/dashboard" element={<Dashboard />} />
                <Route exact path="/tickets" element={<Tickets />} />
                
                <Route path="*" element={<Page404 />} />
              </Routes>
            </div>
          </>
        ) : (
          <div style={{ width: '100vw' }}>
            <Routes>
              <Route exact path="/login" element={<Login />} />
              <Route exact path="/register" element={<Register />} />
            </Routes>
          </div>
        )
      }
    </div>
  );
}

export default App;
