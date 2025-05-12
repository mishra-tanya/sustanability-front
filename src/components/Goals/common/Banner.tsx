import React, { useState } from 'react';
import { Alert, AlertTitle, Button, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate } from 'react-router-dom';

const HelpfulBanner: React.FC = () => {
  const [visible, setVisible] = useState(true);
  const navigate = useNavigate();

  if (!visible) return null;

  return (
    <Alert
      severity="info"
      action={
        <>
          <Button
            color="inherit"
            size="small"
            onClick={() =>
              navigate('/payment-details', {
                state: {
                  message: 'Donation',
                  amount: 100,
                },
              })
            }
          >
            Click here to Donate
          </Button>
          <IconButton
            aria-label="close"
            color="inherit"
            size="small"
            onClick={() => setVisible(false)}
          >
            <CloseIcon fontSize="inherit" />
          </IconButton>
        </>
      }
      sx={{ mb: 2 }}
    >
      <AlertTitle>If you found this helpful</AlertTitle>
      Consider donating to support our mission.
    </Alert>
  );
};

export default HelpfulBanner;
