import React from 'react';
import { Typography, Box } from '@mui/material';
import GoalCard from './common/GoalCard';  
import Dash from './Dashboard/Dash';

interface Goal {
  id: number;
  goal_name: string;
  description: string;
}

interface GoalsPageContentProps {
  goals: Goal[];
  onGoalClick: (goalId: number) => void;
  classNameUser:string;
}

const GoalsPageContent: React.FC<GoalsPageContentProps> = ({ goals, onGoalClick ,classNameUser}) => (
 <>
  <Box sx={{ padding: { md: 10, xs: 2 } }}>
    <Box sx={{ padding: { md: 1, xs: 1 } }}>
    <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom:2}}>
                        <Typography variant="h5" color="textSecondary">
                            Progress Dashboard
                        </Typography>
                    </Box>
    <Dash classId={classNameUser}/>
     <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: 5 }}>
                        <Typography variant="h5" color="textSecondary">
                            Total Goals 17
                        </Typography>
                    </Box>
     <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Typography variant="caption" color="textSecondary">
                            Each Contains Total 10 Tests
                        </Typography>
                    </Box>
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
 </>
);

export default GoalsPageContent;
