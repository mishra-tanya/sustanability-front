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
  <Grid container direction="column" spacing={2} sx={{ maxWidth: 345, margin: 'auto' }}>
    {img && (
      <Grid item xs={12}>
        <CardMedia
          component="img"
          image={img}
          alt={goal.goal_name}
          sx={{ width: '100%', objectFit: 'cover', borderRadius: 1 }}
        />
      </Grid>
    )}

    <Grid item xs={12}>
      <Card variant="outlined" sx={{ border: '1px solid #e0e0e0', borderRadius: 2 }}>
        <CardContent>
         
          {goal.status && (
             <>
             <Typography variant='h5' sx={{ textAlign: 'center', marginBottom: 2 }}>
             {goal.description}
           </Typography>
           <hr />
           <br />
            <Grid container spacing={2} sx={{ marginBottom: 2 }}>
              <Grid item xs={12} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Typography variant="body2" color="text.secondary" sx={{ display: 'flex', alignItems: 'center' }}>
                  <Assignment sx={{ color: 'grey', marginRight: "3px" }} />
                  Total 10 Questions
                </Typography>

                <Typography
                  variant="body2"
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
              </Grid>
            </Grid>
             </>
          )}
          <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: 2, paddingBottom: 1 }}>
            <Button
              variant="contained"
              color="success"
              onClick={() => onGoalClick(goal.id)}
            >
              Start
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Grid>
  </Grid>
);

export default GoalCard;
