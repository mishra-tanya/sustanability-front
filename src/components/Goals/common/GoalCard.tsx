import React from 'react';
import { Card, CardContent, CardActions, Button, Typography } from '@mui/material';

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
  <Card sx={{ marginBottom: 2, border: "1px solid #e0e0e0" }}>
    <CardContent>
      <Typography variant="h6" sx={{ fontWeight: "bold" }}>
        {goal.goal_name}
      </Typography>
      <Typography color="textSecondary">{goal.description}</Typography>
    </CardContent>
    <CardActions sx={{ justifyContent: 'flex-end' }}>
      <Button variant="contained" color="primary" onClick={() => onGoalClick(goal.id)}>
        Start
      </Button>
    </CardActions>
  </Card>
);

export default GoalCard;
