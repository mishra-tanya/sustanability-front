import React from 'react';
import { Card, CardContent, CardMedia, Button, Typography, Grid, Box } from '@mui/material';
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
  <Grid container direction="column" spacing={1}>
    {img && (
      <Grid item xs={12}>
        <CardMedia
          component="img"
          image={img}
          alt={goal.goal_name}
          sx={{ width: '100%', height: 'auto' }}
        />
      </Grid>
    )}
    <Grid item xs={12}>
      <Card variant="outlined" sx={{ border: '1px solid #e0e0e0' }}>
        <CardContent>
          <Typography color="textSecondary" sx={{textAlign:'center'}}>
            {goal.description}
          </Typography>
        </CardContent>
        
            {goal.status && (
             
              <Grid container spacing={2} sx={{  marginBottom: 2 }}>
                
              <Grid item xs={12} md={12} sx={{ display: 'flex', alignItems: 'center' }}>
              <Assignment sx={{ color: 'grey', marginRight: 0.5,marginLeft:1 }} />
              <Typography variant="caption"
    > Total_Questions_10 </Typography>
  <Box sx={{ display: 'flex', justifyContent: 'flex-end', width: '100%', paddingRight: 2 }}>
             
    <Typography
      variant="caption"
      color={goal.status === 'attempted' ? 'green' : 'red'}
      sx={{ display: 'flex', alignItems: 'center' }} 
    >
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
  </Box>
  
  </Grid>
         
         </Grid>
)}


        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: 'auto',pb:1 }}>
  <Button variant="contained" color="success" onClick={() => onGoalClick(goal.id)}>
    Start
  </Button>
</Box>
      </Card>
      
    </Grid>
   
  </Grid>
);

export default GoalCard;
