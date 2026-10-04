import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import './ActivitiesChart.css';

const ActivitiesChart = ({ data }) => {
  return (
    <div className="activities-card">
      <div className="activities-header">
        <div className="activities-title">
          <h3>Activities</h3>
          <select>
            <option>May - June 2021</option>
          </select>
        </div>
        <div className="activities-legend">
          <div className="legend-item">
            <div className="legend-color" style={{ backgroundColor: 'var(--chart-guest)' }}></div>
            Guest
          </div>
          <div className="legend-item">
            <div className="legend-color" style={{ backgroundColor: 'var(--chart-user)' }}></div>
            User
          </div>
        </div>
      </div>
      
      <div style={{ width: '100%', height: 300 }}>
        <ResponsiveContainer>
          <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="week" axisLine={false} tickLine={false} />
            <YAxis axisLine={false} tickLine={false} domain={[0, 500]} />
            <Tooltip />
            <Line type="monotone" dataKey="guest" stroke="var(--chart-guest)" strokeWidth={3} dot={false} />
            <Line type="monotone" dataKey="user" stroke="var(--chart-user)" strokeWidth={3} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ActivitiesChart;
