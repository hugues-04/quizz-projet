// Login.js
import React, { useState } from 'react';
import axios from 'axios';

function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/login', {
        username,
        password
      });
      console.log('Login successful:', response.data);
      window.location.href = '/';      
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  const handleCreateAccount = () => {
    window.location.href = '/register';      
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button type="submit">Login</button>
      </form>
      <button onClick={handleCreateAccount}>Create account</button>
    </div>
  );
}

export default LoginForm;
