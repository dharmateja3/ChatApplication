import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './users.css';

function UsersList({ user, setUser }) {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:3001/users');
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const handleUserClick = (recipientId) => {
    navigate(`/chat/${recipientId}`);
  };

  const handleLogout = () => {
    setUser(null);
    navigate('/login');
  };

  return (
    <div className='d-flex align-items-center justify-content-center' >
    <div className="users-list border border-success rounded col-4 p-4 ">
        <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className='p-2 text-primarybadge text-bg-success text-wrap rounded'>Welcome, {user.username}!</h2>
        <button className="btn btn-outline-danger fs-4" onClick={handleLogout}><i className="fa-solid fa-power-off"></i></button>
      </div>
      <h4 className=''>Contacts</h4><hr></hr>
      <ul className="list-group">
        {users.map((u) => (
          u.id !== user.id && (
            <li
              key={u.id}
              className="item list-group-item list-group-item-action mb-2" style={{"cursor":"pointer"}}
              onClick={() => handleUserClick(u.id)}
            >
              <i class="fa-regular fa-user"></i> {u.username}
            </li>
          )
        ))}
      </ul>
    </div>
    </div>
  );
}

export default UsersList;
