import React, { useState, useContext } from 'react';
import { BiSearch, BiBell } from 'react-icons/bi';
import { AuthContext } from '../../context/AuthContext';
import { googleLogout } from '@react-oauth/google';
import './Topbar.css';

const Topbar = ({ user }) => {
  const [showLogout, setShowLogout] = useState(false);
  const { logout } = useContext(AuthContext);

  const handleLogout = () => {
    googleLogout();
    logout();
  };

  return (
    <div className="topbar">
      <h2 className="topbar-title">Dashboard</h2>

      <div className="topbar-right">
        <div className="search-box">
          <input type="text" placeholder="Search..." />
          <BiSearch color="var(--muted)" />
        </div>

        <BiBell size={24} className="bell-icon" />

        <div className="logout-menu">
          <button className="logout-btn" onClick={handleLogout} style={{ position: 'static', padding: '5px 15px', backgroundColor: 'var(--black)', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Topbar;
