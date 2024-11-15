import React, { useState, useEffect } from 'react';
import { CircularProgress,Box,Card, CardContent, CardActions, Button, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { useParams } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import { useNavigate } from 'react-router-dom';
import { EmojiEvents } from '@mui/icons-material';  
import api from '../services/axios';
import StarBorderPurple500Icon from '@mui/icons-material/StarBorderPurple500';

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

const Goals: React.FC = () => {
  const { className } = useParams<{ className: string }>();
  const navigate = useNavigate();
  
  const [goals, setGoals] = useState<Goal[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    const fetchGoals = async () => {
      try {
        const response = await api.get(`/class/${className}`);
        setGoals(response.data); 
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
        <Typography variant='h4' sx={{textAlign:"center",fontWeight:"bold"}}>For Class {className}th</Typography>

        <Box 
      sx={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: "center", 
        marginTop: 2, 
        flexDirection: { xs: 'column', sm: 'row' } // Column on small screens, row on medium and up
      }}
    >
      <Button 
        variant="contained" 
        color="primary" 
        onClick={handleDialogOpen} 
        sx={{ marginBottom: { xs: 2, sm: 0 }, marginRight: { sm: 2 } }} // Adjusts margin for responsive layout
      >
        See Leadership Board
      </Button>

      <Button 
        variant="contained" 
        color="primary" 
        sx={{ marginBottom: { xs: 2, sm: 0 }, marginRight: { sm: 2 } }}
      >
        Get Merit Certificate
      </Button>

      <Button 
        variant="contained" 
        color="primary" 
        sx={{ marginBottom: { xs: 2, sm: 0 } }}
      >
        Get Participation Certificate
      </Button>
    </Box>

      <Card>
        <CardContent>
        <Box sx={{ padding: 1 }}>
      <Typography variant="h4" sx={{ textAlign: "center", padding: 2 }} gutterBottom>
        Goals
      </Typography>
      
      {goals.length === 0 ? (
        <Typography>No goals found for this class.</Typography>
      ) : (
        goals.map((goal) => (
          <Card key={goal.id} sx={{ marginBottom: 2, border: "1px solid #e0e0e0" }}>
            <CardContent>
              <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                {goal.goal_name}
              </Typography>
              <Typography color="textSecondary">
                {goal.description}
              </Typography>
            </CardContent>
            <CardActions sx={{ justifyContent: 'flex-end' }}>
              <Button 
                variant="contained" 
                color="primary" 
                onClick={() => handleGoalClick(goal.id)}
              >
                Start
              </Button>
            </CardActions>
          </Card>
        ))
      )}
    </Box>
        </CardContent>
      </Card>

        <Dialog open={openDialog} onClose={handleDialogClose} maxWidth="md" fullWidth>
          <DialogTitle sx={{backgroundColor:"#e29114"}}>
            <Typography variant="h5" gutterBottom sx={{ textAlign: "center", display: 'flex', justifyContent: 'center', alignItems: 'center',color:"white" }}>
              <EmojiEvents sx={{ marginRight: 1, fontSize: 30,color:"white" }} />
              Leadership Board 
            </Typography>
            <Typography sx={{textAlign: "center",color:"white"}}>
              Overall Ranking Class {className}
            </Typography>
          </DialogTitle>
          <hr />
          <DialogContent>
            <TableContainer component={Paper} sx={{ marginBottom: 4 }}>
              <Table>
                <TableHead>
                  <TableRow sx={{backgroundColor:"#4caf50",color:"white"}}>
                    <TableCell></TableCell>
                    <TableCell sx={{ color: 'white' }}>Rank</TableCell>
                    <TableCell sx={{ color: 'white' }}>Name</TableCell>
                    <TableCell sx={{ color: 'white' }}>School</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {leaderboardData.map((entry, index) => (
                    <TableRow key={entry.id}>
                        {/* <StarBorderPurple500Icon/> */}
                      <TableCell><StarBorderPurple500Icon></StarBorderPurple500Icon></TableCell>
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

export default Goals;
