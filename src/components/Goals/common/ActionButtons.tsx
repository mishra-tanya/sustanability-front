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
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: { xs: 'column', sm: 'row' },
        width: '100%',
        marginTop:'10px' ,
        marginBottom:'10px'
      }}
    >
      <Button
        variant="contained"
        color="primary"
        onClick={onLeaderboardClick}
        sx={{
          marginBottom: { xs: 2, sm: 0 },
          marginRight: { sm: 2 },
        }}
      >
        See Leadership Board
      </Button>
      <Button
        variant="contained"
        color="primary"
        sx={{
          marginBottom: { xs: 2, sm: 0 },
          marginRight: { sm: 2 },
        }}
      >
        Get Merit Certificate
      </Button>
      <Button
        variant="contained"
        color="primary"
        sx={{
          marginBottom: { xs: 2, sm: 0 },
        }}
      >
        Get Participation Certificate
      </Button>
    </Box>
  </>
);

export default ActionButtons;
