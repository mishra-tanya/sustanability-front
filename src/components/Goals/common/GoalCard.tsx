import React from 'react';
import { Card, CardContent, Button, Typography, Grid } from '@mui/material';
import { Assignment } from '@mui/icons-material';

interface Goal {
  id: number;
  goal_name: string;
  description: string;
}

interface GoalCardProps {
  goal: Goal;
  onGoalClick: (goalId: number) => void;
}

const GoalCard: React.FC<GoalCardProps> = ({ goal, onGoalClick }) => (

  <Card sx={{ marginBottom: 2, border: '1px solid #e0e0e0' }}>
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
