import React from 'react';
import { Typography, Box, Card,CardContent } from '@mui/material';
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

const TestsGoalsPageContent: React.FC<GoalsPageContentProps> = ({ goals, onGoalClick }) => (
  <Card>
    <CardContent>
      <Box sx={{ padding: 1 }}>
        <Typography variant="h4" sx={{ textAlign: "center", padding: 2 }} gutterBottom>
          Tests
        </Typography>
        {goals.length === 0 ? (
          <Typography>No Tests found for this class.</Typography>
        ) : (
          goals.map((goal) => (
            <GoalCard key={goal.id} goal={goal} onGoalClick={onGoalClick} />
          ))
        )}
      </Box>
    </CardContent>
  </Card>
);

export default TestsGoalsPageContent;
