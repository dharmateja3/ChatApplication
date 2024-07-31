import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Register() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = async () => {
    const response = await axios.post('http://localhost:3001/register', { username, email, password });
    alert(response.data.message);
    if (response.data.message === 'User registered!') {
      navigate('/login');
    }
  };

  return (
    <div className='d-flex align-items-center justify-content-center'>
    <div className="auth-form my-5 col-4 border border-success p-4">
      <center><h2 className="mb-3">Register</h2></center>
      <div className="mb-3">
        <input type="text" className="form-control" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)}/>
      </div>
      <div className="mb-3">
        <input type="email" className="form-control" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)}/>
      </div>
      <div className="mb-3">
        <input type="password" className="form-control" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}/>
      </div>
      <center><button className="btn btn-primary" onClick={handleRegister}>Register</button></center><br/>
      <span>Already Registered?<button className="btn btn-link" onClick={() => navigate('/login')}>Login</button></span>
    </div>
    </div>
  );
}

export default Register;
