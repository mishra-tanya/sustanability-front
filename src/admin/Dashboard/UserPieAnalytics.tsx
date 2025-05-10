import React, { useEffect, useState } from 'react';
import { Select, MenuItem, InputLabel, FormControl } from '@mui/material';
import api from '../../services/axios';
import PieChartWithTooltip from '../common/PieChart';

const tooltipStyles = {
  background: "#f1f5f9",
  fontSize: "10px",
  padding: "2px 20px",
  borderRadius: "10px"
};

const chartOptions = [
  { label: 'By Country', value: 'country', title: 'Users by Country', endpoint: '/geographic-distribution' },
  { label: 'By Users Activity', value: 'type', title: 'Users Segmentation', endpoint: '/user-segmentation' },
  { label: 'By Class', value: 'class', title: 'Users by Class', endpoint: '/by-class' },
  { label: 'By Goals Completion', value: 'goals', title: 'Users by Goals com', endpoint: '/getUserCompletedGoals' },

];

const UserPieAnalytics: React.FC = () => {
  const [selectedChart, setSelectedChart] = useState('country');
  const [data, setData] = useState<{ name: string; value: number }[]>([]);
  const [chartTitle, setChartTitle] = useState('Users by Country');

  useEffect(() => {
    const selected = chartOptions.find(opt => opt.value === selectedChart);
    if (!selected) return;

    api.get(selected.endpoint)
      .then(response => {
        if (Array.isArray(response.data)) {
          const formatted = response.data.map((item: any) => {
            switch (selectedChart) {
              case 'country':
                return { name: item.country || 'Unknown', value: item.count };
              case 'type':
                return { name: item.type || 'Unknown', value: item.count };
              case 'class':
                return { name: 'Class ' + (item.class?.slice(6) || 'Unknown'), value: item.count };
              case 'goals':
                return { name: 'Class '+ item.class_id|| 'Unknown', value: item.users_with_51_tests };
              default:
                return { name: 'Unknown', value: 0 };
            }
          });
          setChartTitle(selected.title);
          setData(formatted);
        }
      })
      .catch(err => {
        console.error("Failed to fetch chart data:", err);
        setData([]);
      });
  }, [selectedChart]);

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const { name, value } = payload[0];
      const labelType = selectedChart === 'country' ? 'Country' : selectedChart === 'type' ? 'Type' : 'Class';
      return (
        <div style={tooltipStyles}>
          <p className="font-semibold">{labelType}: {name}</p>
          <p>Users: {value}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="w-full">
      <div className="flex justify-center mb-4">
        <FormControl>
          <InputLabel>Category</InputLabel>
          <Select
            value={selectedChart}
            onChange={(e) => setSelectedChart(e.target.value)}
            label="Category"
          >
            {chartOptions.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>

      <PieChartWithTooltip
        data={data}
        title={chartTitle}
        customTooltip={<CustomTooltip />}
      />
    </div>
  );
};

export default UserPieAnalytics;
