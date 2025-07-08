import React, { useState } from 'react';
import { Alert, AlertTitle, Button, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate, useParams } from 'react-router-dom';

const HelpfulBanner: React.FC = () => {
  const [visible, setVisible] = useState(true);
  const navigate = useNavigate();
  const { className: classId } = useParams<{ className: string;  }>();

  // console.log("hi",classId);
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
                  message: 'Certificate For Class ' + classId,
                  // message: 'Donation',
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
      <AlertTitle>Payment For Certificates</AlertTitle>
To receive certificates, a one-time payment of ₹100 is required. After payment, you’ll be eligible to earn:
<br/>
<ul>
  <li>1 Participation Certificate</li>
  <li>
17 Goal Certificates (one for each SDG you complete)
</li>
  <li>
1 Final Certificate after completing all 17 goals
  </li>
</ul>

That's a total of 19 certificates for just ₹100!
    </Alert>
  );
};

export default HelpfulBanner;
