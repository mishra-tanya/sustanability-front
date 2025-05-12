import React from "react";
import { Box, Typography, Button, Paper } from "@mui/material";
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

const NotFound: React.FC = () => {
  return (
    <Box
      minHeight="100vh"
      display="flex"
      justifyContent="center"
      alignItems="center"
      sx={{
        background: "linear-gradient(135deg, #f3f4f6, #e0e7ff)",
        p: 3,
      }}
    >
      <Box
        sx={{
          p: 6,
          maxWidth: 500,
          width: "100%",
          borderRadius: 4,
          textAlign: "center",
        }}
      >
        <ErrorOutlineIcon sx={{ fontSize: 64, color: "error.main", mb: 2 }} />
        <Typography variant="h2" fontWeight="bold" color="primary" gutterBottom>
          404
        </Typography>
        <Typography variant="h5" fontWeight={600} gutterBottom>
          Page Not Found
        </Typography>
        <Typography variant="body1" color="text.secondary" mb={4}>
          The page you are looking for does not exist. It might have been moved or deleted.
        </Typography>
        <Button
          variant="contained"
          size="large"
          href="/"
          sx={{ borderRadius: 999, px: 4 }}
        >
          Go to Home
        </Button>
      </Box>
    </Box>
  );
};

export default NotFound;
