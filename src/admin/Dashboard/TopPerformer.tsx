import React, { useEffect, useState } from 'react';
import {
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
    Paper, Typography, TextField, MenuItem, Stack
} from '@mui/material';
import api from '../../services/axios';

interface Performer {
    id: number;
    name: string;
    email: string;
    school: string;
    average_score: number;
    last_test_date: string;
}

const TopPerformersTable: React.FC = () => {
    const [performers, setPerformers] = useState<Performer[]>([]);
    const [search, setSearch] = useState('');
    const [sortBy, setSortBy] = useState<'average_score' | 'last_test_date'>('average_score');

    useEffect(() => {
        api.get('/topPerformers')
            .then(res => setPerformers(res.data))
            .catch(err => console.error('Failed to fetch top performers', err));
    }, []);

    const filteredPerformers = performers
        .filter(p =>
            p.name.toLowerCase().includes(search.toLowerCase()) ||
            p.email.toLowerCase().includes(search.toLowerCase()) ||
            p.school.toLowerCase().includes(search.toLowerCase())
        )
        .sort((a, b) => {
            if (sortBy === 'last_test_date') {
                return new Date(b.last_test_date).getTime() - new Date(a.last_test_date).getTime();
            }
            return b.average_score - a.average_score;
        });

    return (
        <TableContainer component={Paper} sx={{ mt: 4, p: 2 }}>
            <Typography variant="h6" align="center" sx={{ mb: 2 }}>
                Top Performers Scoring 10
            </Typography>

            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ mb: 2 }}>
                <TextField
                    label="Search"
                    variant="outlined"
                    fullWidth
                    value={search}
                    onChange={e => setSearch(e.target.value)}
                />
                <TextField
                    label="Sort By"
                    select
                    value={sortBy}
                    onChange={e => setSortBy(e.target.value as any)}
                >
                    <MenuItem value="average_score">Average Score</MenuItem>
                    <MenuItem value="last_test_date">Last Test Date</MenuItem>
                </TextField>
            </Stack>

            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell><strong>S.No.</strong></TableCell>
                        <TableCell><strong>Name</strong></TableCell>
                        <TableCell><strong>School</strong></TableCell>
                        <TableCell><strong>Email</strong></TableCell>
                        <TableCell><strong>Last Test</strong></TableCell>
                        <TableCell align="right"><strong>Avg. Score</strong></TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {filteredPerformers.map((user, index) => (
                        <TableRow key={user.id}>
                            <TableCell>{index + 1}</TableCell>
                            <TableCell>{user.name}</TableCell>
                            <TableCell>{user.school}</TableCell>
                            <TableCell>{user.email}</TableCell>
                            <TableCell>
                                {new Date(user.last_test_date).toLocaleDateString('en-IN', {
                                    day: '2-digit',
                                    month: 'short',
                                    year: 'numeric'
                                })}
                            </TableCell>
                            <TableCell align="right">
                                {user.average_score?.toFixed(2) ?? 'N/A'}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default TopPerformersTable;
