import React, { useState, useEffect } from 'react';
import { CircularProgress,Box, Button, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { useParams } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import { useNavigate } from 'react-router-dom';
import { EmojiEvents } from '@mui/icons-material';  
import api from '../services/axios';

interface LeaderboardEntry {
  id: number;
  name: string;
  score: number;
}

interface Goal {
  id: number;
  goal_name:string;
  description: string;
}

const leaderboardData: LeaderboardEntry[] = [
  { id: 1, name: 'Alice', score: 120 },
  { id: 2, name: 'Bob', score: 110 },
  { id: 3, name: 'Charlie', score: 105 },
  { id: 1, name: 'Alice', score: 120 },
  { id: 2, name: 'Bob', score: 110 },
  { id: 3, name: 'Charlie', score: 105 },
];

const TestSeries: React.FC = () => {
  const { className } = useParams<{ className: string }>();
  const { goal } = useParams<{ goal: string }>();

  const navigate = useNavigate();
  
  const [goals, setGoals] = useState<Goal[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    const fetchGoals = async () => {
      try {
        const response = await api.get(`/class/${className}/goal/${goal}`);
        setGoals(response.data); 
      } catch (error) {
        console.error('Error fetching goals:', error);
      } finally {
        setLoading(false);  
      }
    };

    fetchGoals();
  }, [className,goal]);

  const handleGoalClick = (goalId: number) => {
    navigate(`/class/${className}/${goalId}`);
  };

  const handleDialogOpen = () => {
    setOpenDialog(true);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
  };

  if (loading) {
    return (
        <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
          width: '100%',
          backgroundColor: 'rgba(255, 255, 255, 0.7)',
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <>
      <Navbar />
      <Box sx={{ padding: 4 }}>
        <h2>Tests for Class: {className}</h2>

        <Button 
          variant="contained" 
          color="primary" 
          onClick={handleDialogOpen} 
          sx={{ marginBottom: 2 }}
        >
          See Leadership Board
        </Button>

        <Box sx={{ padding: 5 }}>
          <Typography variant="h4" gutterBottom>
            Goals
          </Typography>
          {goals.length === 0 ? (
            <Typography>No goals found for this class.</Typography>
          ) : (
            goals.map((goal) => (
              <Box key={goal.id} sx={{ display: 'flex', alignItems: 'center', marginBottom: 2 }}>
                <Typography sx={{ flexGrow: 1 }}>{goal.goal_name} {goal.description}</Typography>
                <Button variant="contained" color="primary" onClick={() => handleGoalClick(goal.id)}>
                  Take Action
                </Button>
              </Box>
            ))
          )}
        </Box>

        <Dialog open={openDialog} onClose={handleDialogClose} maxWidth="md" fullWidth>
          <DialogTitle sx={{backgroundColor:"#e29114"}}>
            <Typography variant="h5" gutterBottom sx={{ textAlign: "center", display: 'flex', justifyContent: 'center', alignItems: 'center',color:"white" }}>
              <EmojiEvents sx={{ marginRight: 1, fontSize: 30,color:"white" }} />
              Leadership Board 
            </Typography>
            <Typography sx={{textAlign: "center",color:"white"}}>
              Goal Ranking Class {className}
            </Typography>
          </DialogTitle>
          <hr />
          <DialogContent>
            <TableContainer component={Paper} sx={{ marginBottom: 4 }}>
              <Table>
                <TableHead>
                  <TableRow sx={{backgroundColor:"#4caf50",color:"white"}}>
                    <TableCell sx={{ color: 'white' }}>Rank</TableCell>
                    <TableCell sx={{ color: 'white' }}>Name</TableCell>
                    <TableCell sx={{ color: 'white' }}>Score</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {leaderboardData.map((entry, index) => (
                    <TableRow key={entry.id}>
                      <TableCell sx={{ color: '#4caf50',fontWeight:"bold" }}>#{index + 1}</TableCell>
                      <TableCell>{entry.name}</TableCell>
                      <TableCell>{entry.score}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleDialogClose} color="primary">
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
      <Footer />
    </>
  );
};

export default TestSeries;
