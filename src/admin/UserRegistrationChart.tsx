import React, { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import dayjs from 'dayjs';
import api from '../services/axios';
import Footer from '../components/Footer';

interface UserRegistrationData {
  date: string;
  count: number;
}

const UserRegistrationChart: React.FC = () => {
  const [data, setData] = useState<UserRegistrationData[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get('/track');
        const filledData = fillMissingDates(response.data);
        setData(filledData);
      } catch (error) {
        console.error('Error fetching user registration data:', error);
      }
    };

    fetchData();
  }, []);

  const fillMissingDates = (data: UserRegistrationData[]): UserRegistrationData[] => {
    const last7Days = Array.from({ length: 7 }, (_, i) => 
      dayjs().subtract(6 - i, 'day').format('YYYY-MM-DD')
    );

    const dataMap = new Map(data.map(item => [item.date, item.count]));

    return last7Days.map(date => ({
      date,
      count: dataMap.get(date) || 0,
    }));
  };

  return (
  <>
  <div style={{ overflowX: 'auto', width: '100%' }}>
    <div style={{ minWidth: '600px' }}> 
      <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
        <XAxis dataKey="date" />
        <YAxis
        domain={[1, 'dataMax']} 
        allowDecimals={false} 
        />
        <Tooltip />
        <Line type="monotone" dataKey="count" stroke="#8884d8" activeDot={{ r: 8 }} />
      </LineChart>
    </ResponsiveContainer>
    </div>
    </div>
<Footer/>
  </>
  );
};

export default UserRegistrationChart;
