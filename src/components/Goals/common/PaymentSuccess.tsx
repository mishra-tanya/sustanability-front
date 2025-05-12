import { Link, useSearchParams } from "react-router-dom";
import { Box, Typography, keyframes } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

const bounceAnimation = keyframes`
  0% { transform: scale(0.8); }
  50% { transform: scale(1.2); }
  100% { transform: scale(1); }
`;

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get("order_id");
  const paymentId = searchParams.get("payment_id");

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "#f1fdf5",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        textAlign: "center",
        p: 3,
      }}
    >
      <Box
        sx={{
          bgcolor: "#c8f7dc",
          borderRadius: "50%",
          p: 3,
          mb: 3,
          animation: `${bounceAnimation} 0.6s ease-out`,
        }}
      >
        <CheckCircleIcon sx={{ fontSize: 80, color: "#00c853" }} />
      </Box>

      <Typography variant="h4" fontWeight="bold" color="success.main" gutterBottom>
        Payment Successful!
      </Typography>
      <Typography variant="subtitle1" color="text.secondary" gutterBottom>
        Thank you for your payment via Razorpay.
      </Typography>
<br /><br />
        <Typography variant="body1" gutterBottom>
          <strong>Order ID:</strong> {orderId}
        </Typography>
        <Typography variant="body1">
          <strong>Payment ID:</strong> {paymentId}
        </Typography><br /><br />
        <Link to='/'>Go Back to Home Page</Link>
    </Box>
  );
};

export default PaymentSuccess;
