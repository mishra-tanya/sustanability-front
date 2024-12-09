import { Box, Button, SelectChangeEvent } from '@mui/material';
import { registerUser } from '../../services/apiService';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextFieldComponent, SelectFieldComponent } from '../common/InputField';
import { PasswordField } from '../common/PasswordField';
import { MessageAlert } from '../common/MessageAlert';
import LoadingSpinner from '../common/LoadingSpinner';

const RegistrationForm = ({ formState, setFormState, isLoading, setIsLoading }: any) => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const validateForm = () => {
    const errors: any = {};
    if (!formState.name) errors.name = 'Name is required';
    else if (formState.name.length < 2) errors.name = 'Name must be at least 2 characters';

    if (!formState.country) errors.country = 'Country is required';
    if (!formState.address) errors.address = 'Address is required';
    else if (formState.address.length < 6) errors.address = 'Address must be at least 6 characters';
    if (!formState.school) errors.school = 'School is required';
    if (!formState.className) errors.className = 'Class is required';
    
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!formState.email) errors.email = 'Email is required';
    else if (!emailRegex.test(formState.email)) errors.email = 'Invalid email address';
    
    if (!formState.password) errors.password = 'Password is required';
    else if (formState.password.length < 6) errors.password = 'Password must be at least 6 characters';

    setFormState((prev: any) => ({ ...prev, errors }));
    return Object.keys(errors).length === 0; 
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormState((prevState: any) => ({
      ...prevState,
      [name]: value,
      errors: { ...prevState.errors, [name]: '' },
    }));
  };

  const selecthandleChange = (e: SelectChangeEvent<string>) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    });
  };
  
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsLoading(true);
    try {
      await registerUser(formState);
      setFormState((prev: any) => ({ ...prev, message: 'Registration successful!' }));
      navigate('/login', { state: { message: 'Registration successful! Please log in.' } });
    } catch (error) {
        console.log(error);
      setFormState((prev: any) => ({ ...prev, message: 'Registration failed. Please try again.' }));
    } finally {
      setIsLoading(false);
    }
  };

  const togglePasswordVisibility = () => setShowPassword((prev) => !prev);

  return (
    <form onSubmit={handleRegister}>
      <MessageAlert message={formState.message} severity='success'/>
      <Box mb={2}><TextFieldComponent name="name" value={formState.name} onChange={handleChange} label="Name" error={formState.errors.name} /></Box>
      <Box mb={2}><TextFieldComponent name="country" value={formState.country} onChange={handleChange} label="Country" error={formState.errors.country} /></Box>
      <Box mb={2}><TextFieldComponent name="address" value={formState.address} onChange={handleChange} label="Address" error={formState.errors.address} /></Box>
      <Box mb={2}><TextFieldComponent name="school" value={formState.school} onChange={handleChange} label="School" error={formState.errors.school} /></Box>
      <Box mb={2}><SelectFieldComponent name="className" value={formState.className} onChange={selecthandleChange} label="Class" error={formState.errors.className} /></Box>
      <Box mb={2}><TextFieldComponent name="email" value={formState.email} onChange={handleChange} label="Email" error={formState.errors.email} /></Box>
      <Box mb={2}>
        <PasswordField name="password" value={formState.password} onChange={handleChange} label="Password" error={formState.errors.password} showPassword={showPassword} toggleShowPassword={togglePasswordVisibility} />
      </Box>
      <Box mb={2} sx={{ position: 'relative' }}>
        <Button type="submit" fullWidth variant="contained" color="primary" disabled={isLoading}>Register</Button>
        {isLoading && <LoadingSpinner size={24} color="primary.main" />}
        </Box>
    </form>
  );
};

export default RegistrationForm;
