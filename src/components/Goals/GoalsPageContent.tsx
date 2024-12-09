import React from 'react';
import { Typography, Box } from '@mui/material';
import GoalCard from './common/GoalCard';  

interface Goal {
  id: number;
  goal_name: string;
  description: string;
}

interface GoalsPageContentProps {
  goals: Goal[];
  onGoalClick: (goalId: number) => void;
}

const GoalsPageContent: React.FC<GoalsPageContentProps> = ({ goals, onGoalClick }) => (
  <Box sx={{ padding: { md: 10, xs: 2 } }}>
    <Box sx={{ padding: { md: 1, xs: 1 } }}>
      
      {goals.length === 0 ? (
        <Typography>No goals found for this class.</Typography>
      ) : (
        goals.map((goal) => (
          <Box key={goal.id} sx={{ marginBottom: 2 }}>
            <GoalCard goal={goal} onGoalClick={onGoalClick} />
        
          </Box>
        ))
      )}
    </Box>
  </Box>
);

export default GoalsPageContent;
