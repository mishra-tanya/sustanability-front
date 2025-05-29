import React, { useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  Typography,
  CircularProgress,
  Divider,
  Stack,
} from '@mui/material';
import { useLocation } from 'react-router-dom';
import PaymentIcon from '@mui/icons-material/Payment';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import handlePayment from './PaymentPage';
import api from '../../../services/axios';

interface LocationState {
  message: string;
  amount: number;
}

const PaymentDetails: React.FC = () => {
  const location = useLocation();
  const state = location.state as LocationState;

  const message = state?.message || 'Certification';
  const amount = state?.amount || 0;

  const [loading, setLoading] = useState(false);
  const [phonePeLoading, setPhonePeLoading] = useState(false);
  const [user, setUser] = useState<string | null>(null);

  const initiateRazorpay = async () => {
    setLoading(true);
    try {
      await handlePayment(amount, message);
    } finally {
      setLoading(false);
    }
  };

React.useEffect(() => {
  const storedUserId = localStorage.getItem('user_id');
  setUser(storedUserId);
}, []);

const initiatePhonePe = async () => {
  if (!user) {
    alert('User not logged in.');
    return;
  }

  setPhonePeLoading(true);
  try {
    const res = await api.post('/phonepe-initiate', {
      amount: amount * 100,
      payment_type: message,
      user_id: user,   
    });

    if (res.data.redirect_url) {
      window.location.href = res.data.redirect_url;
    } else {
      alert('PhonePe initiation failed.');
    }
  } catch (err) {
    console.error(err);
    alert('PhonePe payment failed.');
  } finally {
    setPhonePeLoading(false);
  }
};

  return (
    <Box
      sx={{
        minHeight: '100vh',
        bgcolor: '#f5f7fa',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        p: 2,
      }}
    >
      <Card elevation={6} sx={{ maxWidth: 450, width: '100%', borderRadius: 4, p: 3, backgroundColor: '#ffffff' }}>
        <CardContent>
          <Stack spacing={2} alignItems="center">
            {message === 'Donation' ? (
              <></>
              // <D sx={{ fontSize: 50, color: 'error.main' }} />
            ) : (
              <EmojiEventsIcon sx={{ fontSize: 50, color: 'primary.main' }} />
            )}

            <Typography variant="h5" fontWeight="bold">{message} Payment</Typography>

            <Divider sx={{ width: '100%' }} />

            <Typography variant="h6" color="text.secondary">Amount to Pay</Typography>
            <Typography variant="h4" fontWeight="bold" color="success.main">₹{amount}</Typography>

            <Typography variant="body1" color="text.secondary" sx={{ textAlign: 'center', mt: 1 }}>
              {message === 'Certification'
                ? 'This payment is for obtaining a professional certification. Your certificate will be issued upon confirmation.'
                : 'This payment is a kind donation. Your support directly helps us continue our mission and grow.'}
            </Typography>

            <Button
              variant="contained"
              color="primary"
              fullWidth
              size="large"
              onClick={initiateRazorpay}
              disabled={loading}
              startIcon={loading ? <CircularProgress size={20} color="inherit" /> : <PaymentIcon />}
              sx={{ mt: 2, textTransform: 'none', fontWeight: 600 }}
            >
              {loading ? 'Processing Razorpay...' : 'Pay with Razorpay'}
            </Button>

            <Button
              variant="outlined"
              color="secondary"
              fullWidth
              size="large"
              onClick={initiatePhonePe}
              disabled={phonePeLoading}
              startIcon={phonePeLoading ? <CircularProgress size={20} color="inherit" /> : <PaymentIcon />}
              sx={{ mt: 1, textTransform: 'none', fontWeight: 600 }}
            >
              {phonePeLoading ? 'Processing PhonePe...' : 'Pay with PhonePe'}
            </Button>
          </Stack>
        </CardContent>
      </Card>
    </Box>
  );
};

export default PaymentDetails;
