import React from 'react';
import { CircularProgress } from '@mui/material';

interface LoadingSpinnerProps {
  size?: number;
  color?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ size = 24, color = 'primary.main' }) => (
  <CircularProgress
    size={size}
    sx={{
      color: color,
      position: 'absolute',
      top: '50%',
      left: '50%',
      marginTop: `-${size / 2}px`,
      marginLeft: `-${size / 2}px`,
    }}
  />
);

export default LoadingSpinner;
