import React from 'react';
import { BiPieChartAlt2, BiTagAlt, BiCalendar, BiUser, BiCog } from 'react-icons/bi';
import './Sidebar.css';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <h1 className="sidebar-logo">Board.</h1>
      
      <ul className="nav-links">
        <li>
          <a href="#" className="nav-item active">
            <BiPieChartAlt2 size={20} />
            Dashboard
          </a>
        </li>
        <li>
          <a href="#" className="nav-item">
            <BiTagAlt size={20} />
            Transactions
          </a>
        </li>
        <li>
          <a href="#" className="nav-item">
            <BiCalendar size={20} />
            Schedules
          </a>
        </li>
        <li>
          <a href="#" className="nav-item">
            <BiUser size={20} />
            Users
          </a>
        </li>
        <li>
          <a href="#" className="nav-item">
            <BiCog size={20} />
            Settings
          </a>
        </li>
      </ul>

      <ul className="bottom-links">
        <li><a href="#">Help</a></li>
        <li><a href="#">Contact Us</a></li>
      </ul>
    </div>
  );
};

export default Sidebar;
