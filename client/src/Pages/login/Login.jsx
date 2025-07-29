import React, { useState } from 'react';
import './Login.scss';
import { useNavigate, Link } from 'react-router-dom';
import newRequest from '../../../../Backend/utils/newRequest'; 

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await newRequest.post("user/login", {
        username,
        password
      });
      localStorage.setItem("currentUser", JSON.stringify(res.data));
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className='login'>
      <div className="heading">
        <h1>Login</h1>
        <div className="content">
          <form onSubmit={handleSubmit}>
            <span className="user">Username</span>
            <input
              type='text'
              placeholder='username'
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <span className="pass">Password</span>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <div className="btn-login">
              <button type="submit">Login</button>
            </div>
            {error && <p className="error">{error}</p>}
            <Link to={'/register'} className='footer-login'>
              Don't have an account?
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
