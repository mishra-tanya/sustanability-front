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

interface User {
    id: number;
}
  
const TestsGoals: React.FC = () => {
    const { className } = useParams<{ className: string }>();
    const { goal } = useParams<{ goal: string }>();
    const navigate = useNavigate();
    const [test, setTests] = useState([]);
    const [leaderboard, setLeaderboard] = useState([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [openDialog, setOpenDialog] = useState(false);
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const fetchUserData = async () => {
          try {
            const response = await api.get('/user');
            // console.log(response);
            setUser(response.data);
          } catch (err) {
            console.error('Error fetching goals:', err);
          } finally {
            setLoading(false);
          }
        };
    
        fetchUserData();
      }, []);
      
    useEffect(() => {
        const fetchGoals = async () => {
            try {
                const response = await api.get(`/class/${className}/goal/${goal}`);
                const data = response.data.data;
                // console.log((data));
                if (Array.isArray(data.tests)) {
                    setTests(data.tests);
                } else {
                    console.error('Unexpected data format:', data);
                    setTests([]); 
                }
                if (Array.isArray(data.leaderboard)) {
                    // console.log(data.leaderboard);
                    setLeaderboard(data.leaderboard); 
                } else {
                    console.error('Unexpected data format for leaderboard:', data);
                    setLeaderboard([]);
                }
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
            <Box sx={{ bgcolor:"#0f2b3c",p:2 }}>
                <Typography variant="h4" sx={{ textAlign: "center", fontWeight: "bold" ,color:'white'}}>For Class {className}th</Typography>

                <ActionButtons onLeaderboardClick={handleDialogOpen} />
                </Box>

                <TestsGoalsPageContent goals={test} onGoalClick={handleTestClick} />

            <Footer />
            {user && (
                
                <LeaderboardDialog
                    open={openDialog}
                    onClose={handleDialogClose}
                    leaderboardData={leaderboard}
                    currentUserId={user.id} 
                />
            ) }
        
            {/* <LeaderboardDialog open={openDialog} onClose={handleDialogClose} /> */}
        </>
    );
};

export default TestsGoals;
