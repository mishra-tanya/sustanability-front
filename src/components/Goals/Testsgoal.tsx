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
    const [goals, setGoal] = useState([]);
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
        const fetchGoalName = async () => {
          try {
            const response = await api.get(`/goal/${goal}`);
            setGoal(response.data.goal);
          } catch (err) {
            console.error('Error fetching goals:', err);
          } finally {
            setLoading(false);
          }
        };
    
        fetchGoalName();
      }, [goal]);


    useEffect(() => {
        const fetchGoals = async () => {
            try {
                const response = await api.get(`/class/${className}/goal/${goal}`);
                const data = response.data.data;
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

    const img1='/esdg/img4.png';
    if (loading) {
        return (
            <LoadingSpinner size={44}/>
        );
    }

    return (
        <>
            <Navbar />
            <Box sx={{ bgcolor:"#0f2b3c",p:2 }}>
                 <Box
                                        sx={{
                                            mb:1,
                                            display: 'flex',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                        }}
                                    >
                                        <img src={img1} style={{ width: '80px' }} alt="SDG" />
                                    </Box>
                
                <Typography variant="h4" sx={{ textAlign: "center", fontWeight: "bold" ,color:'white'}}>For Grade {className}th</Typography>
                <Typography variant="h4" sx={{ textAlign: "center", fontWeight: "bold" ,color:'white'}}>Goal: {goals}</Typography>


                <ActionButtons onLeaderboardClick={handleDialogOpen} classGroupProp={className || ''} />
                </Box>

               <TestsGoalsPageContent goals={test} onGoalClick={handleTestClick} />
            <Footer />
            {user && (
                
                <LeaderboardDialog
                    open={openDialog}
                    onClose={handleDialogClose}
                    leaderboardData={leaderboard}
                    currentUserId={user.id} 
                    goals={[]}
                />
            ) }
        
            {/* <LeaderboardDialog open={openDialog} onClose={handleDialogClose} /> */}
        </>
    );
};

export default TestsGoals;
