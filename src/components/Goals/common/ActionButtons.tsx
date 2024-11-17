import React from 'react';
import { Button, Box } from '@mui/material';

interface ActionButtonsProps {
  onLeaderboardClick: () => void;
}

const ActionButtons: React.FC<ActionButtonsProps> = ({ onLeaderboardClick }) => (
  <>
    {console.log('Action Buttons rendered')}
    <Box
      sx={{
        display: 'flex',
        alignItems: 'flex-center',  
        justifyContent: 'center', 
        width: '100%',
        marginTop: '10px',
        marginBottom: '10px',
        flexDirection: {xs:'column',md:'row'},  
      }}
    >
      <Button
        variant="contained"
        color="primary"
        onClick={onLeaderboardClick}
        sx={{
          margin: 2,
        }}
      >
        See Leadership Board
      </Button>
      <Button
        variant="contained"
        color="primary"
        sx={{
          margin: 2,
        }}
      >
        Get Merit Certificate
      </Button>
      <Button
        variant="contained"
        color="primary"
        sx={{
          margin: 2,
        }}
      >
        Get Participation Certificate
      </Button>
    </Box>
  </>
);

export default ActionButtons;
