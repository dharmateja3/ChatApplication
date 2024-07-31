import React, { useState } from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import UsersList from './components/UsersList';
import Chat from './components/Chat';
import './App.css';

function App() {
  const [user, setUser] = useState(null);

  return (
    <BrowserRouter>
      <div className="App pt-5">
        <Routes>
          <Route path="/" element={user ? <Navigate to="/users" /> : <Navigate to="/login" />} />
          <Route path="/login" element={<Login setUser={setUser} />} />
          <Route path="/register" element={<Register />} />
          <Route path="/users" element={user ? <UsersList user={user} setUser={setUser} /> : <Navigate to="/login" />} />
          <Route path="/chat/:recipientId" element={user ? <Chat user={user} /> : <Navigate to="/login" />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
