import { Link, useNavigate } from 'react-router-dom'
import React from 'react';
import './Navbar.scss'

function Navbar() {
  const user = JSON.parse(localStorage.getItem("currentUser"))
  const navigate = useNavigate();
  const username = user?.username || "Guest";

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    navigate('/');
  }

  return (
    <div className="navbar">  
      <div className="left">
        <img src="./logo.png" alt="logo" className="logo" />
        <span>NoteHub</span>
      </div>
      <div className="right">
        <Link to="/" className="link">All Notes</Link>

        {user ? (
          <>
            <button className="logout-button" onClick={handleLogout}>Logout</button>
            <Link to="/add">
                <button className="Add">Add Note</button>
            </Link>
            <span className="user-name">{user.username}</span>
          </>
        ) : (
          <>
            <Link to="/login" className="link">Login</Link>
            <Link to="/register" className="link">Signup</Link>
          </>
        )}

        
        <img src="./noavatar.jpg" alt="user" className="avatar" />
      </div>
    </div>
  );
}
export default Navbar;