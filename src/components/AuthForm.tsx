import React, { useState } from 'react';
import api from '../services/axios';
import Navbar from './Navbar';
import { Card, CardContent, TextField, Button, Box, Typography, Link, Container, Alert, Select, MenuItem, FormControl, InputLabel, CircularProgress,InputAdornment,IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom'; 
import Footer from './Footer';
import { Link as RouterLink } from 'react-router-dom';
import { Visibility, VisibilityOff } from '@mui/icons-material';

interface FormState {
  name: string;
  email: string;
  password: string;
  country: string;
  address: string;
  school: string;
  className: string;
  message: string;

  errors: {
    name?: string;
    email?: string;
    password?: string;
    country?: string;
    address?: string;
    school?: string;
    className?: string;
  };
}

const AuthForm: React.FC = () => {
  const [formState, setFormState] = useState<FormState>({
    name: '',
    email: '',
    password: '',
    country: '',
    address: '',
    school: '',
    className: '',
    message: '',
    errors: {},
  });
  const [isLoading, setIsLoading] = useState(false); // Loading state

  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();  

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormState((prevState) => ({
      ...prevState,
      [name]: value,
      errors: { ...prevState.errors, [name]: '' }, 
    }));
  };
 const togglePasswordVisibility = () => {
        setShowPassword((prev) => !prev);
    };
  const validateForm = (): boolean => {
    let isValid = true;
    const errors: FormState['errors'] = {};

    if (!formState.name) {
      errors.name = 'Name is required';
      isValid = false;
    }
    if (!formState.email) {
      errors.email = 'Email is required';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formState.email)) {
      errors.email = 'Email is not valid';
      isValid = false;
    }
    if (!formState.password) {
      errors.password = 'Password is required';
      isValid = false;
    } else if (formState.password.length < 6) {
      errors.password = 'Password must be at least 6 characters';
      isValid = false;
    }
    if (!formState.country) {
      errors.country = 'Country is required';
      isValid = false;
    }
    if (!formState.address) {
      errors.address = 'Address is required';
      isValid = false;
    }
    if (!formState.school) {
      errors.school = 'School is required';
      isValid = false;
    }
    if (!formState.className) {
      errors.className = 'Class is required';
      isValid = false;
    }

    setFormState((prevState) => ({
      ...prevState,
      errors: errors, 
    }));

    return isValid;
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return; 
    }

    setIsLoading(true); // Start loading

    try {
      const response = await api.post('/register', {
        name: formState.name,
        email: formState.email,
        password: formState.password,
        country: formState.country,
        address: formState.address,
        school: formState.school,
        className: formState.className,
      });

      setFormState((prevState) => ({
        ...prevState,
        message: 'Registration successful!',
      }));
      console.log('User registered:', response.data);

      navigate('/login', { state: { message: 'Registration successful! Please log in.' } });
    } catch (error) {
      setFormState((prevState) => ({
        ...prevState,
        message: 'Registration failed. Please try again.',
      }));
      console.error('Registration error:', error);
    } finally {
      setIsLoading(false); // End loading
    }
  };

  return (
    <>
      <Navbar />
      <br></br>
      <Container maxWidth="sm" sx={{ mb:10 }}>
        <Card variant="outlined" sx={{ width: '100%', padding: 3 }}>
          <CardContent>
            <Typography variant="h5" align="center" gutterBottom >
              Registration Form 
            </Typography>
            {formState.message && (
              <Alert severity={formState.message.includes('successful') ? 'success' : 'error'} sx={{ mt: 2, mb: 2 }}>
                {formState.message}
              </Alert>
            )}

            <form onSubmit={handleRegister}>
              <Box mb={2}>
                <TextField
                  fullWidth
                  name="name"
                  value={formState.name}
                  onChange={handleChange}
                  label="Name"
                  variant="outlined"
                  required
                  error={!!formState.errors.name}
                  helperText={formState.errors.name}
                />
              </Box>
              <Box mb={2}>
                <TextField
                  fullWidth
                  name="country"
                  value={formState.country}
                  onChange={handleChange}
                  label="Country"
                  variant="outlined"
                  required
                  error={!!formState.errors.country}
                  helperText={formState.errors.country}
                />
              </Box>
              <Box mb={2}>
                <TextField
                  fullWidth
                  name="address"
                  value={formState.address}
                  onChange={handleChange}
                  label="Address"
                  variant="outlined"
                  required
                  error={!!formState.errors.address}
                  helperText={formState.errors.address}
                />
              </Box>
              <Box mb={2}>
                <TextField
                  fullWidth
                  name="school"
                  value={formState.school}
                  onChange={handleChange}
                  label="School"
                  variant="outlined"
                  required
                  error={!!formState.errors.school}
                  helperText={formState.errors.school}
                />
              </Box>
              <Box mb={2}>
              <FormControl fullWidth variant="outlined" required error={!!formState.errors.className}>
                <InputLabel>Class</InputLabel>
                <Select
                  name="className"
                  value={formState.className}
                  onChange={handleChange}
                  label="Class"
                  required
                >
                  <MenuItem value="class_4-5">Class 4-5</MenuItem>
                  <MenuItem value="class_6-8">Class 6-8</MenuItem>
                  <MenuItem value="class_9-10">Class 9-10</MenuItem>
                  <MenuItem value="class_11-12">Class 11-12</MenuItem>
                </Select>
              </FormControl>
              </Box>
              <Box mb={2}>
                <TextField
                  fullWidth
                  type="email"
                  name="email"
                  value={formState.email}
                  onChange={handleChange}
                  label="Email"
                  variant="outlined"
                  required
                  error={!!formState.errors.email}
                  helperText={formState.errors.email}
                />
              </Box>
              <Box mb={2}>
                <TextField
                  fullWidth
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formState.password}
                  onChange={handleChange}
                  label="Password"
                  variant="outlined"
                  required
                  error={!!formState.errors.password}
                  helperText={formState.errors.password}
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
              </Box>
              <Box mb={2} sx={{ position: 'relative' }}>
                <Button type="submit" fullWidth variant="contained" color="primary" disabled={isLoading}>
                  Register
                </Button>
                {isLoading && (
                  <CircularProgress
                    size={24}
                    sx={{
                      color: 'primary.main',
                      position: 'absolute',
                      top: '50%',
                      left: '50%',
                      marginTop: '-12px',
                      marginLeft: '-12px',
                    }}
                  />
                )}
              </Box>
            </form>
          </CardContent>
          <Typography align="center" sx={{ mt: 2 }}>
            Already have an account?{' '}
            <Link component={RouterLink} to="/login" underline="hover" color="primary">
              Login here
            </Link>
          </Typography>
        </Card>
      </Container>
      <Footer />
    </>
  );
};

export default AuthForm;
