import React, { useState, useEffect, useContext } from 'react';
import { fetchDashboardData } from '../../services/api';
import Sidebar from '../../components/Sidebar/Sidebar';
import Topbar from '../../components/Topbar/Topbar';
import StatCard from '../../components/StatCard/StatCard';
import ActivitiesChart from '../../components/ActivitiesChart/ActivitiesChart';
import TopProductsChart from '../../components/TopProductsChart/TopProductsChart';
import ScheduleCard from '../../components/ScheduleCard/ScheduleCard';
import './Dashboard.css';
import { AuthContext } from '../../context/AuthContext';

import { BiCameraMovie, BiTagAlt, BiLike, BiUser } from 'react-icons/bi';

const Dashboard = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    fetchDashboardData().then(res => {
      setData(res);
      setLoading(false);
    }).catch(err => {
      console.error(err);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return <div style={{ padding: '20px' }}>Loading dashboard...</div>;
  }

  if (!data) {
    return <div style={{ padding: '20px' }}>Error loading data.</div>;
  }

  const statIcons = {
    revenues: <BiCameraMovie size={24} />,
    transactions: <BiTagAlt size={24} />,
    likes: <BiLike size={24} />,
    users: <BiUser size={24} />
  };
  
  const statColors = {
    revenues: 'var(--card-green)',
    transactions: 'var(--card-yellow)',
    likes: 'var(--card-red)',
    users: 'var(--card-purple)'
  };

  const formatCurrency = (val) => `$${val.toLocaleString()}`;
  const formatNumber = (val) => val.toLocaleString();

  return (
    <div className="dashboard-container">
      <Sidebar />
      <div className="dashboard-content">
        <Topbar user={user} />
        
        <div className="dashboard-grid">
          <div className="stat-cards-row">
            <StatCard 
              title="Total Revenues" 
              value={formatCurrency(data.stats.revenues)} 
              icon={statIcons.revenues} 
              color={statColors.revenues} 
            />
            <StatCard 
              title="Total Transactions" 
              value={formatNumber(data.stats.transactions)} 
              icon={statIcons.transactions} 
              color={statColors.transactions} 
            />
            <StatCard 
              title="Total Likes" 
              value={formatNumber(data.stats.likes)} 
              icon={statIcons.likes} 
              color={statColors.likes} 
            />
            <StatCard 
              title="Total Users" 
              value={formatNumber(data.stats.users)} 
              icon={statIcons.users} 
              color={statColors.users} 
            />
          </div>

          <ActivitiesChart data={data.activities} />

          <div className="bottom-row">
            <TopProductsChart data={data.topProducts} />
            <ScheduleCard data={data.schedule} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
