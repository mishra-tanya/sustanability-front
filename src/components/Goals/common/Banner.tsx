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
            Click here to Pay
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
      <AlertTitle>Payment is Optional</AlertTitle>
If you wish to pay, you may do so. Otherwise, you can continue using the service without payment.

    </Alert>
  );
};

export default HelpfulBanner;
