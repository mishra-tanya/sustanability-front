import React, { useState, useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../../services/axios';
import Navbar from '../Navbar';
import Footer from '../Footer';
import ActionButtons from './common/ActionButtons';
import LeaderboardDialog from './common/LeaderBoard';
import LoadingSpinner from '../common/LoadingSpinner';
import TestsGoalsPageContent from './TestgoalPage';

const TestsGoals: React.FC = () => {
    const { className } = useParams<{ className: string }>();
    const { goal } = useParams<{ goal: string }>();
    const navigate = useNavigate();
    const [test, setTests] = useState([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [openDialog, setOpenDialog] = useState(false);

    useEffect(() => {
        const fetchGoals = async () => {
            try {
                const response = await api.get(`/class/${className}/goal/${goal}`);
                setTests(response.data);
            } catch (error) {
                console.error('Error fetching tests:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchGoals();
    }, [className,goal]);

    const handleTestClick = (testId: number) => {
        navigate(`/class/${className}/goal/${goal}/${testId}/`);
    };

    const handleDialogOpen = () => setOpenDialog(true);
    const handleDialogClose = () => setOpenDialog(false);

    if (loading) {
        return (
            <LoadingSpinner size={44}/>
        );
    }

    return (
        <>
            <Navbar />
            <Box sx={{ padding: 4 }}>
                <Typography variant="h4" sx={{ textAlign: "center", fontWeight: "bold" }}>For Class {className}th</Typography>
                <ActionButtons onLeaderboardClick={handleDialogOpen} />
                <TestsGoalsPageContent goals={test} onGoalClick={handleTestClick} />
                <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 2, backgroundColor: '#f0f0f0' }}>
                </Box>

            </Box>
            <Footer />
            <LeaderboardDialog open={openDialog} onClose={handleDialogClose} />
        </>
    );
};

export default TestsGoals;
