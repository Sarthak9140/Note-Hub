import React, { useState } from 'react';
import './Register.scss';
import newRequest from '../../../../Backend/utils/newRequest';
import {  useNavigate } from 'react-router-dom';

function Register() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(false);
    

    if (password !== confirmPassword) {
      return setError("Passwords do not match");
    }

    try {
      await newRequest.post('user/register', {
        username,
        email,
        password
      });
      setSuccess(true);
      navigate('/login')
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className='register'>
      <h1>Register</h1>
      <div className="content-signup">
        <form onSubmit={handleSubmit}>
          <span className='user'>Username</span>
          <input
            type="text"
            placeholder='Username'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <span className='email'>Email</span>
          <input
            type="email"
            placeholder='abc@gmail.com'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <span className='pass'>Password</span>
          <input
            type="password"
            value={password}
            placeholder="••••••••"
            onChange={(e) => setPassword(e.target.value)}
          />

          <span className='pass'>Confirm Password</span>
          <input
            type="password"
            value={confirmPassword}
            placeholder="••••••••"
            onChange={(e) => setConfirmPassword(e.target.value)}
          />

          <div className="btn-signup">
            <button type="submit">Register</button>
          </div>

          {error && <p className="error">{error}</p>}
          {success && <p className="success">Registered successfully!</p>}
        </form>
      </div>
    </div>
  );
}

export default Register;
