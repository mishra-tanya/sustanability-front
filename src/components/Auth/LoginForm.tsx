import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Container, Typography, Card, CardContent, Link, Box, Button } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import Navbar from '.././Navbar';
import { loginUser } from '../../services/apiService';
import { MessageAlert } from '../common/MessageAlert';
import { TextFieldComponent } from '../common/InputField';
import { PasswordField } from '../common/PasswordField';
import LoadingSpinner from '../common/LoadingSpinner';
import ForgotPasswordModal from './ForgotPasswordModal';
import Footer from '../Footer';

const Login: React.FC = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState("");
    const [isLoading, setLoading] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const { message } = location.state || {};

    const [forgotPasswordOpen, setForgotPasswordOpen] = useState(false);

    const handleOpenForgotPassword = () => setForgotPasswordOpen(true);
    const handleCloseForgotPassword = () => setForgotPasswordOpen(false);

    const handleLogin = async (e: React.FormEvent) => {

        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const response = await loginUser(email, password);
            const { token, role } = response;
            const expiryTime = Date.now() + (2 * 60 * 60 * 1000);
            localStorage.setItem('authTokenExpiry', expiryTime.toString());
            localStorage.setItem("authToken", token);
            localStorage.setItem("userRole", role);   

            if (role === 'admin') {
                navigate("/admin/home");   
            } else {
                navigate("/class");   
            }
            // navigate("/class");
        } catch (e: unknown) {
            if (e instanceof Error) {
                setError(e.message);
            }
        } finally {
            setLoading(false);
        }
    };

    const togglePasswordVisibility = () => setShowPassword((prev) => !prev);

    return (
        <>
            <Navbar />
            <Container maxWidth="xs" sx={{ mb: 15 ,mt:2, pb: 3,pt:3, bgcolor: "#e3f2fd" }}>
                <Card variant="outlined"  sx={{ width: '100%', p: 3 }}>
                    <CardContent>
                        <Typography variant="h5" align="center" sx={{ mb: 3, fontWeight: 'bold' }} gutterBottom>
                            Please  Login
                        </Typography>

                        {message && <MessageAlert message={message} severity="success" />}
                        {error && <MessageAlert message={error} severity="error" />}

                        <form onSubmit={handleLogin}>
                            <Box mb={2}>
                                <TextFieldComponent
                                    name="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    label="Email"
                                    error={error}
                                /></Box>

                            <Box mb={2}>
                                <PasswordField
                                    name="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    label="Password"
                                    error={error}
                                    showPassword={showPassword}
                                    toggleShowPassword={togglePasswordVisibility} />
                            </Box>

                            <Box mb={2} sx={{ position: 'relative' }}>
                                <Button type="submit" fullWidth variant="contained" color="primary" disabled={isLoading}>Login</Button>
                                {isLoading && <LoadingSpinner size={24} color="primary.main" />}
                            </Box>
                        </form>
                    </CardContent>

                    <Typography align="center" sx={{ mt: 2 }}>
                        Don't have an account?{" "}
                        <Link component={RouterLink} to="/register" underline="hover" color="primary">
                            Register here
                        </Link>
                    </Typography>
                    <Typography
                        align="center"
                        color="primary"
                        sx={{ cursor: "pointer",mt:1}}
                        onClick={handleOpenForgotPassword}
                    >
                        Forgot Password?
                    </Typography>
                    <ForgotPasswordModal
                        open={forgotPasswordOpen}
                        onClose={handleCloseForgotPassword}
                    />
                </Card>
            </Container>
            <Footer/>
        </>
    );
};

export default Login;
