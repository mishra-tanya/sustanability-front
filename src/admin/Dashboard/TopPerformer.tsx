import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from '@mui/material';
import api from '../../services/axios';

interface Performer {
    name: string;
    email: string;
    school: string;
    results_avg_score: number;
}

const TopPerformersTable: React.FC = () => {
    const [performers, setPerformers] = useState<Performer[]>([]);

    useEffect(() => {
        api.get('/topPerformers')
            .then(res => setPerformers(res.data))
            .catch(err => console.error('Failed to fetch top performers', err));
    }, []);

    // console.log(performers)
    return (
        <TableContainer component={Paper} sx={{ mt: 4 }}>
            <Typography variant="h6" align="center" sx={{ mt: 2 }}>Top Performers Scoring above 90 Overall (Upto 10)</Typography>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell><strong>S.No.</strong></TableCell>
                        <TableCell><strong>Name</strong></TableCell>
                        <TableCell><strong>School</strong></TableCell>
                        <TableCell><strong>Email</strong></TableCell>
                        <TableCell align="right"><strong>Average Score</strong></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {performers.map((user, index) => (
                        <TableRow key={user.email}>
                            <TableCell>{index + 1}</TableCell>
                            <TableCell>{user.name}</TableCell>
                            <TableCell>{user.school}</TableCell>
                            <TableCell>{user.email}</TableCell>
                            <TableCell align="right">  
                                {user.results_avg_score !== undefined && user.results_avg_score !== null
                                ? parseFloat(user.results_avg_score as any).toFixed(2)
                                : 'N/A'}
                            </TableCell> </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default TopPerformersTable;
