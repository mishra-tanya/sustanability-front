import React from 'react';
import { Button, Box } from '@mui/material';

interface QNavigationProps {
  currentIndex: number;
  totalQuestions: number;
  onPrevious: () => void;
  onNext: () => void;
  onJumpTo: (index: number) => void;
}

const QNavigation: React.FC<QNavigationProps> = ({
  currentIndex,
  totalQuestions,
  onPrevious,
  onNext,
  onJumpTo,
}) => (
  <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column', width: '100%' }}>
    <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%', mb: 2 }}>
      <Button   variant="contained" color="primary" onClick={onPrevious} disabled={currentIndex === 0}>
        Previous
      </Button>
      <Button   variant="contained" color="primary"  onClick={onNext} disabled={currentIndex === totalQuestions - 1}>
        Next
      </Button>
    </Box>

    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        overflowX: 'auto',
        flexWrap: 'wrap',
        maxWidth: '100%',
        gap: '5px',
        padding: '10px',
        bgcolor: 'background.paper',
        borderRadius: '8px',
      }}
    >
      {Array.from({ length: totalQuestions }, (_, index) => (
        <Button
          key={index}
          onClick={() => onJumpTo(index)}
          sx={{
            minWidth: '36px',
            margin: '5px 0',
            backgroundColor: currentIndex === index ? '#1976d2' : '#e0e0e0',
            color: 'white',
            flexShrink: 0,
          }}
        >
          {index + 1}
        </Button>
      ))}
    </Box>
  </Box>
);

export default QNavigation;
