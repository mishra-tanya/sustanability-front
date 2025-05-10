import React from 'react';
import { COLORS } from './Colors';
import {
  PieChart, Pie, Tooltip, Cell, Legend, ResponsiveContainer
} from 'recharts';
import { Typography } from '@mui/material';

interface PieChartWithTooltipProps {
  data: { name: string; value: number }[];
  title?: string;
  customTooltip?: React.ReactElement;
}

const renderCustomLabel = ({
  cx, cy, midAngle, innerRadius, outerRadius, percent
}: any) => {
  const RADIAN = Math.PI / 180;
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text x={x} y={y} fill="black" textAnchor="middle" dominantBaseline="central" fontSize={12}>
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

const PieChartWithTooltip: React.FC<PieChartWithTooltipProps> = ({ data, title, customTooltip }) => {
  return (
    <div style={{ width: '100%', height: 450 }}>
      {title && <Typography variant='h4'sx={{textAlign:"center",fontWeight:"bold"}}>{title}</Typography>}
      <ResponsiveContainer>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            outerRadius={180}
            fill="#8884d8"
            dataKey="value"
            label={renderCustomLabel}
          >
            {data.map((_, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip content={customTooltip || undefined} />
          <Legend layout="horizontal" verticalAlign="bottom" align="center" />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PieChartWithTooltip;
