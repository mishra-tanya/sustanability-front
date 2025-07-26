import { Box, Typography } from '@mui/material';
import { TypeAnimation } from 'react-type-animation';
import { useMemo } from 'react';

const CustomBlinkingCursor = () => {
  // Use useMemo to avoid unnecessary re-renders of sequence array
  const animationSequence = useMemo(() => [
    'Welcome to Sustainability Olympiad',
    2000,
  ], []);

  return (
    <Box component="section" aria-label="Hero Section">
      <Typography
        component="h2"
        sx={{
          fontSize: { xs: '2rem', md: '3rem' },
          fontWeight: 'bold',
          display: 'inline',
          whiteSpace: 'normal',
        }}
      >
        <TypeAnimation
          sequence={animationSequence}
          speed={50}
          repeat={Infinity}
          wrapper="span"
          style={{ display: 'inline-block', fontWeight: 'bold' }}
          cursor={false}
        />
        <Box
          component="span"
          aria-hidden="true"
          sx={{
            fontSize: { xs: '2rem', md: '3rem' },
            animation: 'blink 1s infinite',
            ml: 0.5,
          }}
        >
          🌍
        </Box>
      </Typography>

      {/* Move keyframes to global CSS or define once */}
      <style>
        {`
          @keyframes blink {
            0%, 100% {
              opacity: 1;
            }
            50% {
              opacity: 0;
            }
          }
        `}
      </style>
    </Box>
  );
};

export default CustomBlinkingCursor;
