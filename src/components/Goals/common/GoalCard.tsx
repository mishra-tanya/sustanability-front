import React from 'react';
import {
  Card,
  CardContent,
  CardMedia,
  Button,
  Typography,
  Grid,
  Box,
  Chip,
  Divider
} from '@mui/material';
import { Assignment, Cancel, CheckCircle } from '@mui/icons-material';

interface Goal {
  id: number;
  goal_name: string;
  description: string;
  status?: string;
}

interface GoalCardProps {
  goal: Goal;
  onGoalClick: (goalId: number) => void;
  img?: string;
}

const GoalCard: React.FC<GoalCardProps> = ({ goal, onGoalClick, img }) => (
  <Card
    elevation={3}
    sx={{
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      borderRadius: 3,
      transition: 'transform 0.3s ease, box-shadow 0.3s ease',
      '&:hover': {
        transform: 'scale(1.02)',
        boxShadow: 6,
      },
    }}
  >
    {img && (
      <CardMedia
        component="img"
        image={img}
        alt={goal.goal_name}
        sx={{
          maxHeight:'400px',
          width: '100%',
          objectFit: 'cover',
        }}
      />
    )}

    <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
      <Typography variant="h6" fontWeight="bold" sx={{textAlign:"center"}} gutterBottom color="primary">
        {goal.goal_name}
      </Typography>

      <Typography variant="body2" color="text.secondary" sx={{textAlign:"center"}} gutterBottom>
        <b>{goal.description}</b>
      </Typography>

      {goal.status && (
        <>
          <Divider sx={{ my: 2 }} />
          <Grid container alignItems="center" justifyContent="space-between">
            <Box display="flex" alignItems="center" gap={1}>
              <Assignment color="action" />
              <Typography variant="body2" color="text.secondary">
                Total 10 Questions
              </Typography>
            </Box>

           <Chip
  icon={
    goal.status === 'attempted' ? (
      <CheckCircle fontSize="small" />
    ) : (
      <Cancel fontSize="small" />
    )
  }
  label={goal.status === 'attempted' ? 'Completed' : 'Not Completed'}
  sx={{
    backgroundColor: goal.status === 'attempted' ? 'success.main' : 'error.main',
    color: 'white',
    fontSize: '0.8rem',
    '& .MuiChip-icon': {
      color: 'white',
    }
  }}
/>



          </Grid>
        </>
      )}

      <Box mt="auto" textAlign="center" pt={2}>
        <Button
          variant="contained"
          color="success"
          size="medium"
          onClick={() => onGoalClick(goal.id)}
        >
          Start
        </Button>
      </Box>
    </CardContent>
  </Card>
);

export default GoalCard;
