import React from 'react';
import './ScheduleCard.css';

const ScheduleCard = ({ data }) => {
  return (
    <div className="schedule-card">
      <div className="schedule-header">
        <h3>Today's schedule</h3>
        <a href="#">See All &gt;</a>
      </div>
      
      <div className="schedule-list">
        {data.map((item, index) => (
          <div 
            className="schedule-item" 
            key={index}
            style={{ borderColor: item.color === 'green' ? 'var(--pie-green)' : 'var(--card-purple)' }}
          >
            <span className="schedule-title">{item.title}</span>
            <span className="schedule-time">{item.time}</span>
            <span className="schedule-location">{item.location}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ScheduleCard;
