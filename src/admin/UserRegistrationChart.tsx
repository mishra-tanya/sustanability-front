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
  const [days, setDays] = useState<number>(7);  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get(`/track?days=${days}`);
        let transformedData = response.data;

        if (days === 365 || days===180) {
          transformedData = groupDataByMonth(transformedData);
        }

        setData(transformedData);
      } catch (error) {
        console.error('Error fetching user registration data:', error);
      }
    };

    fetchData();
  }, [days]); 

  const groupDataByMonth = (data: UserRegistrationData[]) => {
    const groupedData: { [key: string]: number } = {};

    data.forEach(item => {
      const month = dayjs(item.date).format('YYYY-MM'); 
      groupedData[month] = (groupedData[month] || 0) + item.count;
    });

    return Object.keys(groupedData).map(month => ({
      date: month, 
      count: groupedData[month],
    }));
  };

  return (
    <>
      <div>
        <select
          value={days}
          onChange={(e) => setDays(Number(e.target.value))}
          style={{ marginBottom: '20px', padding: '5px' }}
        >
          <option value={7}>Last 7 Days</option>
          <option value={15}>Last 15 Days</option>
          <option value={30}>Last 1 Month</option>
          <option value={90}>Last 3 Months</option>
          <option value={180}>Last 6 Months</option>
          <option value={365}>Last 1 Year</option>
        </select>
      </div>

      <div style={{ overflowX: 'auto', width: '100%' }}>
        <div style={{ minWidth: '600px' }}>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data}>
              <XAxis
                dataKey="date"
                tickFormatter={(date) => {
                  if (days === 365 || days===180) {
                    return dayjs(date).format('MMM');
                  } else {
                    return dayjs(date).format('DD MMM');
                  }
                }}
              />
              <YAxis
                domain={[0, 'dataMax']} 
                allowDecimals={false}
              />
              <Tooltip />
              <Line type="monotone" dataKey="count" stroke="#8884d8" activeDot={{ r: 8 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default UserRegistrationChart;
