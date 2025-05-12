import React from 'react';
import { Typography, Box, Grid } from '@mui/material';
import GoalCard from './common/GoalCard';  
import Dash from './Dashboard/Dash';
import { images } from './common/GoalImages';
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
                            Each Contains Total 3 Tests
                        </Typography>
                    </Box>
                    <br></br>
      {goals.length === 0 ? (
        <Typography>No goals found for this class.</Typography>
      ) : (
      <>
      
          <Grid container spacing={5}>
      {goals.map((goal,index) => (
        <Grid item xs={12} sm={6} md={3} key={goal.id}>  
          <GoalCard goal={goal} onGoalClick={onGoalClick} img={images[index]}/>
        </Grid>
      ))}
    </Grid>

      </>
      )}
    </Box>
  </Box>
 </>
);

export default GoalsPageContent;
