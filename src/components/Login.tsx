import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Alert, Container, Typography, Card, CardContent, TextField, Button, CircularProgress, IconButton, InputAdornment ,Link} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import Navbar from './Navbar';
import api, { getCsrfToken } from '../services/axios';
import { Link as RouterLink } from 'react-router-dom';

const Login: React.FC = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            await getCsrfToken();
            const response = await api.post("/login", { email, password });

            if (response.status === 200) {
                const { token } = response.data;
                localStorage.setItem("authToken", token);
                navigate("/dashboard");
            }
        } catch (e) {
            setError("Invalid credentials, please try again.");
        } finally {
            setLoading(false);
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword((prev) => !prev);
    };

    const location = useLocation();
    const { message } = location.state || {};

    return (
      <>
        <Navbar />
        <Container maxWidth="xs" sx={{mb:15}}>
          <Card sx={{ mt: 5, p: 3 }}>
            <CardContent>
              <Typography variant="h5" align="center" gutterBottom>
                Login
              </Typography>
              {message && (
                <Alert severity="success" sx={{ mb: 2 }}>
                  {message}
                </Alert>
              )}
                {error && (
                  <Alert severity="error" sx={{ mt: 2 ,mb:2}}>
                    {error}
                  </Alert>
                )}
              <form onSubmit={handleLogin}>
                <TextField
                  label="Email"
                  type="email"
                  fullWidth
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  margin="normal"
                />
                <TextField
                  label="Password"
                  type={showPassword ? "text" : "password"}
                  fullWidth
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  margin="normal"
                  InputProps={{
                      endAdornment: (
                          <InputAdornment position="end">
                              <IconButton onClick={togglePasswordVisibility} edge="end">
                                  {showPassword ? <VisibilityOff /> : <Visibility />}
                              </IconButton>
                          </InputAdornment>
                      ),
                  }}
                />
              
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                  disabled={loading}
                  sx={{ mt: 2 }}
                >
                  {loading ? <CircularProgress size={24} color="inherit" /> : "Login"}
                </Button>
              </form>
            </CardContent>
            <Typography align="center" sx={{ mt: 2 }}>
            Don't have account?{' '}
            <Link component={RouterLink} to="/register" underline="hover" color="primary">
              Register here
            </Link>
          </Typography>

          </Card>

        </Container>
      </>
    );
};

export default Login;
