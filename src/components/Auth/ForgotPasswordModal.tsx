import { useState } from "react";
import {
  Box,
  Button,
  Modal,
  Typography,
  TextField,
  Stack,
} from "@mui/material";
import api from "../../services/axios";
const ForgotPasswordModal = ({ open, onClose }: { open: boolean; onClose: () => void }) => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const response = await api.post("/forgot-password", { email });
      
      setSuccessMessage(response.data.message);
      setErrorMessage("");
      onClose();
    } catch (error:any) {
      setErrorMessage(error.response?.data?.message || "Something went wrong");
      setSuccessMessage("");
    }
    setLoading(false);
  };

  return (
    <Modal open={open} onClose={onClose} aria-labelledby="forgot-password-modal">
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          maxWidth: 800,
          minWidth: 400,
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
          borderRadius: 1,
        }}
      >
        <Typography id="forgot-password-modal" align="center" variant="h6" sx={{ mb: 3, fontWeight: "bold" }}>
          Forgot Password
        </Typography>
        <Typography variant="caption">
          ** You will receive a reset link on your registered email **
        </Typography>
        <br />
        <br />
        <Typography variant="caption" align="center">
          Please Enter Your Registered Email Address
        </Typography>
        <Stack spacing={2}>
          <TextField
            label="Email"
            type="email"
            variant="outlined"
            size="small"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
            error={!!errorMessage}
            helperText={errorMessage}
          />
          {successMessage && <Typography color="success.main">{successMessage}</Typography>}
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            fullWidth
            disabled={loading}
          >
            {loading ? "Submitting..." : "Submit"}
          </Button>
          <Button variant="text" onClick={onClose} fullWidth>
            Cancel
          </Button>
        </Stack>
      </Box>
    </Modal>
  );
};

export default ForgotPasswordModal;
