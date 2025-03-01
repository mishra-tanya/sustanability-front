import React from 'react';
import { Typography, Box, Grid,  } from '@mui/material';
import GoalCard from './common/GoalCard';  

interface Goal {
  id: number;
  goal_name: string;
  description: string;
  status:string;
}

interface GoalsPageContentProps {
  goals: Goal[];
  onGoalClick: (goalId: number) => void;
}

const TestsGoalsPageContent: React.FC<GoalsPageContentProps> = ({ goals, onGoalClick }) => (
      <Box sx={{ padding:{xs:2,md:10} }}>
        <Typography variant="h4" sx={{ textAlign: "center", padding: 2 }} gutterBottom>
          Tests  
        </Typography>
        {goals.length === 0 ? (
          <Typography>No Tests found for this class.</Typography>
        ) : (
         <>
       <Grid container spacing={3}>
         {
           goals.map((goal) => (
            <Grid item xs={12} sm={6} md={4} key={goal.id}>  
            <GoalCard key={goal.id} goal={goal} onGoalClick={onGoalClick} />
         </Grid>

          ))
         }
         </Grid>
         </>
        )}
      </Box>
    
);

export default TestsGoalsPageContent;
