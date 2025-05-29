import { Box, Typography } from '@mui/material';
import { TypeAnimation } from 'react-type-animation';

const CustomBlinkingCursor = () => {
  return (
    <Box>
      <Typography
        variant="h2"
        sx={{
          display: 'inline',   
          fontWeight: 'bold',
          whiteSpace: 'normal',  
        }}
      >
        <TypeAnimation
          sequence={[
            'Welcome to Sustainability Olympiad',
            2000,
          ]}
          speed={50}
          repeat={Infinity}
          style={{ display: 'inline-block', fontWeight: 'bold' }}
          cursor={false}
        />
        <Box
          component="span"
          sx={{
            fontSize: '3rem',
            animation: 'blink 1s infinite',
            marginLeft: 0,
            marginTop: 0,  
          }}
        >
          🌍
        </Box>
      </Typography>

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
