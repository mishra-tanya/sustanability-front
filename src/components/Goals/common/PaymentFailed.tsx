import { Box, Typography } from "@mui/material";
import ErrorIcon from "@mui/icons-material/Error";
import { keyframes } from "@mui/system";

const shake = keyframes`
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-5px); }
  75% { transform: translateX(5px); }
`;

const PaymentFailed = () => {

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "#fff3f3",
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
          bgcolor: "#ffcdd2",
          borderRadius: "50%",
          p: 3,
          mb: 3,
          animation: `${shake} 0.6s ease-in-out`,
        }}
      >
        <ErrorIcon sx={{ fontSize: 80, color: "#d50000" }} />
      </Box>

      <Typography variant="h4" fontWeight="bold" color="error.main" gutterBottom>
        Payment Failed
      </Typography>
      <Typography variant="subtitle1" color="text.secondary" gutterBottom>
        Please try again or contact support.
      </Typography>

   
    </Box>
  );
};

export default PaymentFailed;
