import React, { useState, useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../Navbar';
import Footer from '../Footer';
import GoalsPageContent from './GoalsPageContent';
import ActionButtons from './common/ActionButtons';
import LeaderboardDialog from './common/LeaderBoard';
import LoadingSpinner from '../common/LoadingSpinner';
import { getGoals } from '../../services/apiService';

const Goals: React.FC = () => {
    const { className } = useParams<{ className: string }>();
    const navigate = useNavigate();
    const [goals, setGoals] = useState([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [openDialog, setOpenDialog] = useState(false);

    useEffect(() => {
        const fetchGoals = async () => {
            try {
                const data = await getGoals(className!); 
                setGoals(data);
            } catch (error) {
                console.error('Error fetching goals:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchGoals();
    }, [className]);

    const handleGoalClick = (goalId: number) => {
        navigate(`/class/${className}/goal/${goalId}`);
    };

    const handleDialogOpen = () => setOpenDialog(true);
    const handleDialogClose = () => setOpenDialog(false);

    if (loading) {
        return (
            <LoadingSpinner  size={44}/>
        );
    }

    return (
        <>
            <Navbar />
            <Box sx={{ padding: 4 }}>
                <Typography variant="h4" sx={{ textAlign: "center", fontWeight: "bold" }}>For Class {className}th</Typography>
                <ActionButtons onLeaderboardClick={handleDialogOpen} />
                <GoalsPageContent goals={goals} onGoalClick={handleGoalClick} />
                <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 2, backgroundColor: '#f0f0f0' }}>
                </Box>

            </Box>
            <Footer />
            <LeaderboardDialog open={openDialog} onClose={handleDialogClose} />
        </>
    );
};

export default Goals;
