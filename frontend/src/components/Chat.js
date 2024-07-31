import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Chat.css';

function Chat({ user }) {
  const { recipientId } = useParams();
  const [recipient, setRecipient] = useState(null);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const messagesEndRef = useRef(null);
  const navigate = useNavigate(); 

  useEffect(() => {
    fetchRecipient();
    fetchMessages();
  }, [recipientId]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const fetchMessages = async () => {
    const response = await axios.get(`http://localhost:3001/messages/${user.id}/${recipientId}`);
    setMessages(response.data);
  };

  useEffect(() => {
    const interval = setInterval(() => {
        fetchMessages();
    },1000);
    return () => {
      clearInterval(interval);
    }
  }, []);
  

  const fetchRecipient = async () => {
    const response = await axios.get(`http://localhost:3001/users/${recipientId}`);
    setRecipient(response.data);
  };

  const handleSendMessage = async () => {
    if (!message) return;
    try {
      await axios.post('http://localhost:3001/messages', { user_id: user.id, recipient_id: recipientId, message });
      setMessage('');
      fetchMessages();
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className='d-flex align-items-start justify-content-center'>
    <div className="chat-container col-md-6 bg-dark">
    <div className='header p-2 badge border-bottom text-wrap rounded d-flex justify-content-between'>
        <div className='d-flex'>
        <button className='btn text-white fs-3 mr-3' onClick={() => navigate('/users')}><i class="fa-solid fa-arrow-left"></i></button>
      <h2 className=''><i class="fa-regular fa-user"></i> {recipient?.username}</h2>
      </div>
      <button className='btn text-white justify-content-end fs-2' onClick={fetchMessages}><i class="fa-solid fa-rotate-right"></i></button>
    </div>
      <div className="messages p-3" style={{ height: '460px', overflowY: 'scroll' }}>
        {messages.map((msg, index) => (
          <div
            key={msg.id}
            className={`mb-2 p-2 rounded ${msg.sender === user.username ? 'sender float-end' : 'receiver float-start'}`}
            style={{clear:'both', maxWidth: '80%', textAlign: msg.sender === user.username ? 'right' : 'left' }}
          >
            {msg.message}
            <em className="text-muted d-block" style={{ fontSize: '0.8em' }}>{new Date(msg.timestamp).toLocaleString()}</em>
            {index === messages.length - 1 && <div ref={messagesEndRef} />}
          </div>
        ))}
      </div>
      <div className="send-message d-flex align-items-end m-2">
        <input
          type="text"
          className="form-control me-2"
          placeholder="Type a message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button className="btn btn-success" onClick={handleSendMessage}><i class="fa-regular fa-paper-plane"></i></button>
      </div>
    </div>
    </div>
  );
}

export default Chat;
