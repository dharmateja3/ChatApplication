import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Login({ setUser }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    const response = await axios.post('http://localhost:3001/login', { email, password });
    if (response.data.message) {
      alert(response.data.message);
    } else {
      setUser(response.data);
      navigate('/users');
    }
  };

  return (
    <div className='d-flex justify-content-center align-items-center'>
    <div className="auth-form border border-success p-4 rounded" style={{"width":"400px","marginTop":"10%"}}>
      <center><h2 className="mb-3">Login</h2></center>
      <div className="mb-3">
        <input type="email" className="form-control" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)}/>
      </div>
      <div className="mb-3">
        <input type="password" className="form-control" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}/>
      </div>
      <center><button className="btn btn-primary px-3" onClick={handleLogin}>Login</button></center><br/>
      <span>Don't have an account?<button className="btn btn-link" onClick={() => navigate('/register')}> Register</button></span>
    </div>
    </div>
  );
}

export default Login;
