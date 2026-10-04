import axios from 'axios';

const api = axios.create({
  baseURL: '/',
});

export const fetchDashboardData = async () => {
  try {
    const response = await api.get('/data/dashboard.json');
    return response.data;
  } catch (error) {
    console.error("Error fetching dashboard data", error);
    throw error;
  }
};
