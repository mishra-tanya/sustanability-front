import React, { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { MenuItem, Select, InputLabel, FormControl, SelectChangeEvent } from '@mui/material';
import api from '../../services/axios';

interface TestData {
    date: string;
    count: number;
}

const TestsGivenGraph: React.FC = () => {
    const [data, setData] = useState<TestData[]>([]);
    const [daysRange, setDaysRange] = useState<number>(30);

    const dateRanges = [
        { label: 'Last 7 Days', value: 7 },
        { label: 'Last 30 Days', value: 30 },
        { label: 'Last 90 Days', value: 90 },
        { label: 'Last Year', value: 365 },
    ];

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await api.get('/getTestsGiven', { params: { days: daysRange } });
                setData(response.data);
            } catch (error) {
                console.error('Failed to fetch tests data', error);
            }
        };

        fetchData();
    }, [daysRange]);

    const handleRangeChange = (event: SelectChangeEvent<number>) => {
           setDaysRange(Number(event.target.value));
    };

    return (
        <div style={{ width: '100%', height: 400 }}>
            <div className="flex justify-center mb-4">
                <FormControl sx={{ mr: 2 }}>
                    <InputLabel>Time Range</InputLabel>
                    <Select
                        value={daysRange}
                        onChange={handleRangeChange}
                        label="Time Range"
                    >
                        {dateRanges.map((range) => (
                            <MenuItem key={range.value} value={range.value}>
                                {range.label}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </div>

            <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="count" stroke="#8884d8" />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};

export default TestsGivenGraph;
