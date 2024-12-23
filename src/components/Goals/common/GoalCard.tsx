import React from 'react';
import { Card, CardContent, Button, Typography, Grid } from '@mui/material';
import { Assignment, Cancel, CheckCircle } from '@mui/icons-material';

interface Goal {
  id: number;
  goal_name: string;
  description: string;
  status?:string;
}

interface GoalCardProps {
  goal: Goal;
  onGoalClick: (goalId: number) => void;
}

const GoalCard: React.FC<GoalCardProps> = ({ goal, onGoalClick }) => (

  <Card   variant="outlined" sx={{ marginBottom: 2, border: '1px solid #e0e0e0'}}>
    <CardContent>
      <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
        {goal.goal_name}
      </Typography>
      <Typography color="textSecondary">{goal.description}</Typography>
    </CardContent>

    <Grid container spacing={2} sx={{ paddingX: 2,marginBottom:2}}>
      <Grid item xs={12} md={6} sx={{ display: 'flex', alignItems: 'center' }}>
        <Assignment sx={{ marginRight: 1, color: 'grey.600' }} />
        <Typography variant="caption" color="textSecondary">
          Total 10 Tests/Questions
        
        </Typography>
        
        {goal.status && (
      <Typography variant="caption" color={goal.status === 'attempted' ? 'green' : 'red'} sx={{ marginLeft: 1, display: 'flex', alignItems: 'center' }}>
        {goal.status === 'attempted' ? (
          <>
            <CheckCircle sx={{ color: 'green', marginRight: 0.5 }} />
            Completed
          </>
        ) : (
          <>
            <Cancel sx={{ color: 'red', marginRight: 0.5 }} />
            Not Completed
          </>
        )}
      </Typography>
    )}
      </Grid>
     
      <Grid item xs={12} md={6} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Button variant="contained" color="primary" onClick={() => onGoalClick(goal.id)}>
          Start
        </Button>
      </Grid>
    </Grid>

  </Card>
);

export default GoalCard;
