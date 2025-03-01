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
import api from '../../services/axios';

interface User {
    id: number;
}

const Goals: React.FC = () => {
    const { className } = useParams<{ className: string }>();
    const navigate = useNavigate();
    const [goals, setGoals] = useState([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [openDialog, setOpenDialog] = useState(false);
    const [user, setUser] = useState<User | null>(null);
    const [leaderboard, setLeaderboard] = useState([]);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await api.get('/user');
                setUser(response.data);
            } catch (err) {
                console.error('Error fetching user data:', err);
            }
        };

        fetchUserData();
    }, []);

    useEffect(() => {
        const fetchGoals = async () => {
            try {
                const response = await getGoals(className!);
                // console.log("enk");
                const data = response.data;
                if (Array.isArray(data.goal)) {
                    // console.log(data.goal);
                    setGoals(data.goal);
                } else {
                    console.error('Unexpected data format for goals:', data);
                }
                if (Array.isArray(data.leaderboard)) {
                    setLeaderboard(data.leaderboard);
                    console.log(data.leaderboard);
                } else {
                    console.error('Unexpected data format for leaderboard:', data);
                }
            } catch (error) {
                console.error('Error fetching goals:', error);
            } finally {
                setLoading(false);
            }
        };

        if (className) {
            fetchGoals();
        }
    }, [className]);

    const handleGoalClick = (goalId: number) => {
        navigate(`/class/${className}/goal/${goalId}`);
    };

    const handleDialogOpen = () => setOpenDialog(true);
    const handleDialogClose = () => setOpenDialog(false);
    const img1 = '/esdg/img4.png';
    if (loading) {
        return <LoadingSpinner size={44} />;
    }

    return (
        <>
            <Navbar />
            <Box sx={{ padding: 0 }}>
                <Box sx={{ bgcolor: "#0f2b3c", padding: 1 }}>
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                    >
                        <img src={img1} style={{ width: '80px' }} alt="SDG" />
                    </Box>


                    <Typography variant="h4" sx={{ textAlign: "center", color: 'white', margin: 2, fontWeight: "bold" }}>
                        For Class {className}th
                    </Typography>

                    <ActionButtons onLeaderboardClick={handleDialogOpen} classGroupProp={className || ''} />
                </Box>


                {className !== '' && (
                    <GoalsPageContent
                        goals={goals}
                        onGoalClick={handleGoalClick}
                        classNameUser={className || ''}
                    />
                )}

                <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 2, backgroundColor: '#f0f0f0' }}>
                </Box>
            </Box>
            <Footer />
            {user && (
                <LeaderboardDialog
                    open={openDialog}
                    onClose={handleDialogClose}
                    leaderboardData={leaderboard}
                    currentUserId={user.id}
                    goals={goals}
                />
            )}
        </>
    );
};

export default Goals;
